import { NextResponse } from "next/server";
import { getTestStatistics } from "@/lib/supabase";

export async function GET() {
  try {
    console.log("통계 데이터 요청");

    const result = await getTestStatistics();

    if (!result.success) {
      console.error("통계 조회 실패:", result.error);
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error("통계 API 오류:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error", details: error },
      { status: 500 }
    );
  }
}
