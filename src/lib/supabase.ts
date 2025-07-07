import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Supabase 클라이언트 생성 (환경변수가 있을 때만)
export const supabase =
  supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

// 테스트 응답 데이터 타입 정의
export interface TestResponse {
  id?: number;
  created_at?: string;
  user_id: string; // 랜덤 생성된 사용자 ID
  answers: number[]; // [1,2,1,2,1,2,1,2,1,2] - 각 질문의 답안 (a=1, b=2)
  result_type: string; // "extrovert", "introvert", "emotion", "thought"
  result_name: string; // "외향형", "내향형", "감정형", "사고형"
  completion_time: number; // 테스트 완료 시간(초)
  session_time: number; // 전체 세션 시간(초) - 사이트 접속부터 완료까지

  // 유입 및 위치 정보
  referrer?: string; // 유입 경로
  country?: string; // 국가
  region?: string; // 지역
  city?: string; // 도시

  // 디바이스 및 브라우저 정보
  device_type?: string; // "mobile", "tablet", "desktop"
  os?: string; // 운영체제
  browser_name?: string; // 브라우저 이름
  browser_version?: string; // 브라우저 버전
  screen_resolution?: string; // 화면 해상도
  viewport_size?: string; // 뷰포트 크기

  // 기존 정보
  user_agent?: string; // 전체 User-Agent
  ip_address?: string; // 해싱된 IP
}

// 테스트 응답 저장
export async function saveTestResponse(
  data: Omit<TestResponse, "id" | "created_at">
) {
  if (!supabase) {
    const error =
      "Supabase가 설정되지 않았습니다. 환경변수 NEXT_PUBLIC_SUPABASE_URL과 NEXT_PUBLIC_SUPABASE_ANON_KEY를 확인하세요.";
    console.error(error);
    return { success: false, error };
  }

  try {
    const { data: result, error } = await supabase
      .from("test_responses")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("테스트 응답 저장 실패:", error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("테스트 응답 저장 중 오류:", error);
    return { success: false, error };
  }
}

// 모든 테스트 응답 조회 (관리자용)
export async function getAllTestResponses() {
  if (!supabase) {
    return { success: false, error: "Supabase not configured" };
  }

  try {
    const { data, error } = await supabase
      .from("test_responses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("테스트 응답 조회 실패:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("테스트 응답 조회 중 오류:", error);
    return { success: false, error };
  }
}

// 테스트 세션 데이터 타입 정의
export interface TestSessionData {
  user_id: string;
  current_question?: number;
  session_time?: number;
  is_complete?: boolean;
  completion_time?: number;
  result_type?: string;
  result_name?: string;
  result_type_code?: string;
  referrer?: string;
  country?: string;
  region?: string;
  city?: string;
  device_type?: string;
  os?: string;
  browser_name?: string;
  browser_version?: string;
  screen_resolution?: string;
  viewport_size?: string;
  user_agent?: string;
  ip_address?: string;
}

// 테스트 세션 정보 저장/업데이트
export async function saveTestSession(data: TestSessionData) {
  if (!supabase) {
    const error = "Supabase가 설정되지 않았습니다. 환경변수를 확인하세요.";
    console.error(error);
    return { success: false, error };
  }

  try {
    const { data: result, error } = await supabase
      .from("test_sessions")
      .upsert([data])
      .select()
      .single();

    if (error) {
      console.error("테스트 세션 저장 실패:", error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("테스트 세션 저장 중 오류:", error);
    return { success: false, error };
  }
}

// 테스트 답안 데이터 타입 정의
export interface TestAnswerData {
  user_id: string;
  question_number: number;
  answer: 'a' | 'b';
  answer_value: 1 | 2;
  weighted_types: string[];
}

// 답안 저장 (UPSERT 방식)
export async function saveTestAnswer(data: TestAnswerData) {
  if (!supabase) {
    const error = "Supabase가 설정되지 않았습니다. 환경변수를 확인하세요.";
    console.error(error);
    return { success: false, error };
  }

  try {
    const { data: result, error } = await supabase
      .from("test_answers")
      .upsert([data], {
        onConflict: "user_id,question_number", // 복합 UNIQUE 키
      })
      .select()
      .single();

    if (error) {
      console.error("답안 저장 실패:", error);
      return { success: false, error };
    }

    return { success: true, data: result };
  } catch (error) {
    console.error("답안 저장 중 오류:", error);
    return { success: false, error };
  }
}

// 완료된 테스트 조회 (관리자용)
export async function getAllCompletedTests() {
  if (!supabase) {
    return { success: false, error: "Supabase not configured" };
  }

  try {
    const { data, error } = await supabase
      .from("completed_tests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("완료된 테스트 조회 실패:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("완료된 테스트 조회 중 오류:", error);
    return { success: false, error };
  }
}

// 통계 정보 조회 (새로운 구조)
export async function getTestStatistics() {
  if (!supabase) {
    return { success: false, error: "Supabase not configured" };
  }

  try {
    const { data, error } = await supabase
      .from("test_sessions")
      .select("result_type, result_name, completion_time")
      .eq("is_complete", true);

    if (error) {
      console.error("통계 조회 실패:", error);
      return { success: false, error };
    }

    // 결과별 통계 계산
    const stats = {
      total: data.length,
      byType: {} as Record<
        string,
        { count: number; name: string; percentage: number }
      >,
      avgCompletionTime: 0,
    };

    // 유형별 카운트
    data.forEach((response) => {
      if (response.result_type && !stats.byType[response.result_type]) {
        stats.byType[response.result_type] = {
          count: 0,
          name: response.result_name || response.result_type,
          percentage: 0,
        };
      }
      if (response.result_type) {
        stats.byType[response.result_type].count++;
      }
    });

    // 퍼센티지 계산
    Object.keys(stats.byType).forEach((type) => {
      stats.byType[type].percentage = Math.round(
        (stats.byType[type].count / stats.total) * 100
      );
    });

    // 평균 완료 시간 계산
    if (data.length > 0) {
      stats.avgCompletionTime = Math.round(
        data.reduce((sum, r) => sum + (r.completion_time || 0), 0) / data.length
      );
    }

    return { success: true, data: stats };
  } catch (error) {
    console.error("통계 조회 중 오류:", error);
    return { success: false, error };
  }
}
