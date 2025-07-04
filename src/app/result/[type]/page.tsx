"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { personalityTypes } from "@/lib/data";
import { TestResult } from "@/lib/types";
import ResultPage from "@/components/ResultPage";

export default function ResultSharePage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<TestResult | null>(null);

  useEffect(() => {
    const typeId = params.type as string;
    const personalityType = personalityTypes.find(t => t.id === typeId);
    
    if (!personalityType) {
      router.push('/');
      return;
    }

    // 공유용 가짜 결과 생성
    const shareResult: TestResult = {
      personalityType,
      scores: {
        extrovert: typeId === 'extrovert' ? 100 : Math.floor(Math.random() * 80) + 20,
        introvert: typeId === 'introvert' ? 100 : Math.floor(Math.random() * 80) + 20,
        emotion: typeId === 'emotion' ? 100 : Math.floor(Math.random() * 80) + 20,
        thought: typeId === 'thought' ? 100 : Math.floor(Math.random() * 80) + 20,
      },
      answers: []
    };

    setResult(shareResult);
  }, [params.type, router]);

  const handleRestart = () => {
    router.push('/');
  };

  const handleShowAllResults = () => {
    router.push('/');
  };

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">결과를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <ResultPage
        result={result}
        onRestart={handleRestart}
        onShowAllResults={handleShowAllResults}
      />
    </div>
  );
}