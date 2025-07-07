import { NextResponse } from "next/server";
import { getTestStatistics, TestStatistics } from "@/lib/supabase";

// 간단한 메모리 캐시 (5분)
let cache: { data: TestStatistics; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5분

export async function GET() {
  try {
    console.log("통계 데이터 요청");

    // 캐시 확인
    const now = Date.now();
    if (cache && now - cache.timestamp < CACHE_DURATION) {
      console.log("캐시에서 데이터 반환");
      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true,
        cacheAge: Math.round((now - cache.timestamp) / 1000),
      });
    }

    // DB에서 조회
    console.log("DB에서 새 데이터 조회");
    const result = await getTestStatistics();

    if (!result.success) {
      console.error("통계 조회 실패:", result.error);

      // 에러 시 캐시가 있으면 반환
      if (cache) {
        console.log("에러 발생, 캐시 데이터 사용");
        return NextResponse.json({
          success: true,
          data: cache.data,
          cached: true,
          stale: true,
        });
      }

      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    // 캐시 업데이트
    if (result.success) {
      cache = {
        data: result.data,
        timestamp: now,
      };
    }

    return NextResponse.json({
      success: true,
      data: result.data,
      cached: false,
    });
  } catch (error) {
    console.error("통계 API 오류:", error);

    // 에러 시에도 캐시가 있으면 반환
    if (cache) {
      return NextResponse.json({
        success: true,
        data: cache.data,
        cached: true,
        stale: true,
        error: "API 오류, 캐시 사용",
      });
    }

    return NextResponse.json(
      { success: false, error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
