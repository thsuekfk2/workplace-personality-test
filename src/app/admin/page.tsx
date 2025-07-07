"use client";

import { useState } from "react";
import * as XLSX from "xlsx";

interface TestStats {
  total: number;
  byType: Record<string, { count: number; name: string; percentage: number }>;
  avgCompletionTime: number;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState<TestStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const authenticate = () => {
    if (password) {
      setIsAuthenticated(true);
      loadStats();
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch("/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        setStats(result.data);
      } else {
        setMessage("통계 로드 실패");
      }
    } catch (error) {
      console.error("통계 로드 오류:", error);
      setMessage("통계 로드 중 오류 발생");
    }
  };

  const downloadExcel = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/export", {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        
        // 엑셀 파일 생성
        const worksheet = XLSX.utils.json_to_sheet(result.data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "테스트결과");

        // 컬럼 너비 조정
        const wscols = [
          { wch: 5 },   // 번호
          { wch: 20 },  // 제출일시
          { wch: 15 },  // 사용자ID
          { wch: 10 },  // 결과유형
          { wch: 10 },  // 결과타입
          { wch: 10 },  // 완료시간
          ...Array(10).fill({ wch: 8 }), // 답안1-10
          { wch: 30 },  // 브라우저
          { wch: 12 },  // IP해시
        ];
        worksheet["!cols"] = wscols;

        // 파일 다운로드
        const fileName = `직장인유형테스트_${new Date().toISOString().split("T")[0]}.xlsx`;
        XLSX.writeFile(workbook, fileName);
        
        setMessage(`${result.total}개 응답을 엑셀로 다운로드했습니다.`);
      } else {
        setMessage("엑셀 다운로드 실패");
      }
    } catch (error) {
      console.error("엑셀 다운로드 오류:", error);
      setMessage("다운로드 중 오류 발생");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-6 text-center">관리자 로그인</h1>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="관리자 비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && authenticate()}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={authenticate}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition-colors"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h1 className="text-3xl font-bold mb-6">테스트 결과 관리자 페이지</h1>
          
          {/* 통계 섹션 */}
          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800">총 응답 수</h3>
                <p className="text-3xl font-bold text-blue-600">{stats.total}</p>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-green-800">평균 완료 시간</h3>
                <p className="text-3xl font-bold text-green-600">{stats.avgCompletionTime}초</p>
              </div>
              
              {Object.entries(stats.byType).map(([type, data]) => (
                <div key={type} className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-purple-800">{data.name}</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {data.count}명 ({data.percentage}%)
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 액션 버튼들 */}
          <div className="flex space-x-4">
            <button
              onClick={downloadExcel}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>다운로드 중...</span>
                </>
              ) : (
                <>
                  <span>📊</span>
                  <span>엑셀 다운로드</span>
                </>
              )}
            </button>
            
            <button
              onClick={loadStats}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              🔄 통계 새로고침
            </button>
          </div>

          {message && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-blue-800">{message}</p>
            </div>
          )}
        </div>

        {/* 안내 섹션 */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">📊 엑셀 다운로드 데이터 항목</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div>
              <h3 className="font-semibold text-blue-600 mb-2">📝 기본 정보</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• 제출일시, 사용자ID</li>
                <li>• 결과유형, 결과타입</li>
                <li>• 완료시간, 세션시간</li>
                <li>• 10개 질문별 답안</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-green-600 mb-2">🌍 유입 & 위치</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• 유입경로 (Google, Naver 등)</li>
                <li>• 국가, 지역, 도시</li>
                <li>• IP 기반 위치 정보</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-purple-600 mb-2">📱 디바이스 & 브라우저</h3>
              <ul className="space-y-1 text-gray-600">
                <li>• 디바이스타입 (모바일/태블릿/데스크톱)</li>
                <li>• 운영체제, 브라우저명, 버전</li>
                <li>• 화면해상도, 뷰포트크기</li>
                <li>• User-Agent, IP해시</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">🔒 개인정보 보호</h3>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• IP 주소는 해싱 처리되어 개인 식별 불가</p>
              <p>• 랜덤 익명 ID 사용으로 개인정보 보호</p>
              <p>• 위치 정보는 IP 기반 일반적 지역 정보만 수집</p>
              <p>• 모든 데이터는 Supabase에 안전하게 암호화 저장</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}