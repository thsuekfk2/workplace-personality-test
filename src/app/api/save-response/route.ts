import { NextRequest, NextResponse } from 'next/server';
import { saveTestResponse } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('받은 요청 데이터:', JSON.stringify(body, null, 2));
    
    // 사용자 ID 생성 (랜덤)
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // IP 주소 가져오기 (개인정보 고려하여 해싱 처리)
    const forwarded = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwarded ? forwarded.split(',')[0] : realIp || 'unknown';
    const hashedIp = ip ? btoa(ip).slice(0, 10) : 'unknown'; // 간단한 해싱

    const testResponse = {
      user_id: userId,
      answers: body.answers,
      result_type: body.result_type,
      result_name: body.result_name,
      completion_time: body.completion_time,
      session_time: body.session_time || 0,
      
      // 유입 및 위치 정보
      referrer: body.referrer || 'unknown',
      country: body.country || 'unknown',
      region: body.region || 'unknown',
      city: body.city || 'unknown',
      
      // 디바이스 및 브라우저 정보
      device_type: body.device_type || 'unknown',
      os: body.os || 'unknown',
      browser_name: body.browser_name || 'unknown',
      browser_version: body.browser_version || 'unknown',
      screen_resolution: body.screen_resolution || 'unknown',
      viewport_size: body.viewport_size || 'unknown',
      
      // 기존 정보
      user_agent: body.user_agent || 'unknown',
      ip_address: hashedIp,
    };

    console.log('Supabase에 저장할 데이터:', JSON.stringify(testResponse, null, 2));
    
    const result = await saveTestResponse(testResponse);
    console.log('Supabase 저장 결과:', result);

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        message: '테스트 응답이 저장되었습니다.',
        id: result.data?.id 
      });
    } else {
      console.error('Supabase 저장 실패:', result.error);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('API 오류:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error', details: error },
      { status: 500 }
    );
  }
}