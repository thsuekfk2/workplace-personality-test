import { NextRequest, NextResponse } from 'next/server';
import { saveTestSession, saveTestAnswer } from '@/lib/supabase';
import { questions } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('받은 진행 상황 데이터:', JSON.stringify(body, null, 2));
    
    // 사용자 ID 처리 (기존 ID 유지 또는 새로 생성)
    const userId = body.user_id || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // IP 주소 가져오기 (개인정보 고려하여 해싱 처리)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
    const hashedIp = ip ? btoa(ip).slice(0, 10) : 'unknown';

    // 1. 테스트 세션 정보 저장/업데이트
    const sessionData = {
      user_id: userId,
      current_question: body.current_question,
      session_time: body.session_time || 0,
      is_complete: body.is_complete || false,
      
      // 테스트 완료 시 결과 정보 저장
      ...(body.is_complete && {
        completion_time: body.completion_time,
        result_type: body.result_type,
        result_name: body.result_name,
        result_type_code: body.result_type_code, // aa, ab, bb, ba
      }),
      
      // 첫 번째 답안에서만 추가 정보 저장
      ...(body.current_question === 0 && {
        referrer: body.referrer || 'unknown',
        country: body.country || 'unknown',
        region: body.region || 'unknown',
        city: body.city || 'unknown',
        device_type: body.device_type || 'unknown',
        os: body.os || 'unknown',
        browser_name: body.browser_name || 'unknown',
        browser_version: body.browser_version || 'unknown',
        screen_resolution: body.screen_resolution || 'unknown',
        viewport_size: body.viewport_size || 'unknown',
        user_agent: body.user_agent || 'unknown',
        ip_address: hashedIp,
      }),
    };

    console.log('Supabase에 저장할 세션 데이터:', JSON.stringify(sessionData, null, 2));
    
    const sessionResult = await saveTestSession(sessionData);
    
    if (!sessionResult.success) {
      console.error('세션 저장 실패:', sessionResult.error);
      return NextResponse.json(
        { success: false, error: sessionResult.error },
        { status: 500 }
      );
    }

    // 2. 답안 저장 (현재 문항의 답안)
    if (body.answer) {
      // 현재 문항의 weights 정보 가져오기
      const currentQuestion = questions[body.current_question];
      const weights = currentQuestion?.weights[body.answer as 'a' | 'b'];
      
      // weights가 1인 타입들 찾기
      const weightedTypes: string[] = [];
      if (weights) {
        Object.entries(weights).forEach(([type, weight]) => {
          if (weight === 1) {
            weightedTypes.push(type);
          }
        });
      }

      const answerData = {
        user_id: userId,
        question_number: body.current_question,
        answer: body.answer,
        answer_value: body.answer === 'a' ? 1 : 2,
        weighted_types: weightedTypes, // weights가 1인 타입들
      };

      console.log('Supabase에 저장할 답안 데이터:', JSON.stringify(answerData, null, 2));
      
      const answerResult = await saveTestAnswer(answerData);
      
      if (!answerResult.success) {
        console.error('답안 저장 실패:', answerResult.error);
        // 답안 저장 실패해도 세션은 저장된 상태이므로 계속 진행
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: '진행 상황이 저장되었습니다.',
      user_id: userId,
      data: sessionResult.data 
    });

  } catch (error) {
    console.error('진행 상황 저장 API 오류:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error },
      { status: 500 }
    );
  }
}