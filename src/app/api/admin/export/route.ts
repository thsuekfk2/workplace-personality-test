import { NextRequest, NextResponse } from 'next/server';
import { getAllCompletedTests } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    // 간단한 인증 확인
    const authHeader = request.headers.get('authorization');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    
    if (!authHeader || authHeader !== `Bearer ${adminPassword}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const result = await getAllCompletedTests();

    if (result.success) {
      // 엑셀용 데이터 포맷팅
      const formattedData = result.data?.map((response: any, index: number) => ({
        번호: index + 1,
        제출일시: new Date(response.created_at).toLocaleString('ko-KR'),
        사용자ID: response.user_id,
        결과유형: response.result_name,
        결과타입: response.result_type,
        결과타입코드: response.result_type_code,
        완료시간_초: response.completion_time,
        세션시간_초: response.session_time,
        
        // 답안 데이터 (배열에서 개별 컬럼으로)
        답안1: response.answers?.[0] || '',
        답안2: response.answers?.[1] || '',
        답안3: response.answers?.[2] || '',
        답안4: response.answers?.[3] || '',
        답안5: response.answers?.[4] || '',
        답안6: response.answers?.[5] || '',
        답안7: response.answers?.[6] || '',
        답안8: response.answers?.[7] || '',
        답안9: response.answers?.[8] || '',
        답안10: response.answers?.[9] || '',
        
        // 유입 및 위치 정보
        유입경로: response.referrer,
        국가: response.country,
        지역: response.region,
        도시: response.city,
        
        // 디바이스 정보
        디바이스타입: response.device_type,
        운영체제: response.os,
        브라우저명: response.browser_name,
        브라우저버전: response.browser_version,
        화면해상도: response.screen_resolution,
        뷰포트크기: response.viewport_size,
        
        // 기타
        UserAgent: response.user_agent,
        IP해시: response.ip_address,
      })) || [];

      return NextResponse.json({
        success: true,
        data: formattedData,
        total: formattedData.length
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Export API 오류:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}