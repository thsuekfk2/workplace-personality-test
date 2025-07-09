"use client";

import { motion } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { TestResult } from "@/lib/types";
import {
  updateStats,
  getStats,
  getMostPopularType,
  formatCompletionTime,
} from "@/lib/analytics";
import { personalityTypes } from "@/lib/data";
import Character from "@/components/Characters";
import {
  ShareIcon,
  RefreshIcon,
  TrendingUpIcon,
  LightbulbIcon,
  CheckIcon,
  BookIcon,
  HeartIcon,
  WarningIcon,
  KakaoIcon,
  LinkIcon,
  CameraIcon,
} from "@/components/ModernIcons";
import {
  shareToKakao,
  copyToClipboard,
  captureResult,
  showImageInNewTab,
  loadKakaoSDK,
} from "@/lib/shareUtils";

interface ResultPageProps {
  result: TestResult;
  onRestart: () => void;
  onShowAllResults: () => void;
}

export const personalityTypeNames: { [key: string]: string } = {
  extrovert: "진취적이며 자신감 넘치는 행동대장",
  introvert: "낙천적으로 사교적인 배짱이",
  emotion: "솔직한 조언가",
  thought: "배려가 넘치는 따뜻한 평화주의자",
};

export default function ResultPage({
  result,
  onRestart,
  onShowAllResults,
}: ResultPageProps) {
  const { personalityType } = result;
  const [stats, setStats] = useState(getStats());
  const [dbStats, setDbStats] = useState<{
    total: number;
    byType: Record<string, { count: number; name: string; percentage: number }>;
    avgCompletionTime: number;
  } | null>(null);
  const [shareMessage, setShareMessage] = useState("");
  const hasLoadedStats = useRef(false);
  const [startTime] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("testStartTime");
      return saved ? parseInt(saved) : Date.now();
    }
    return Date.now();
  });

  useEffect(() => {
    const completionTime = (Date.now() - startTime) / 1000;
    updateStats(personalityType.id, completionTime);
    setStats(getStats());

    if (typeof window !== "undefined") {
      localStorage.removeItem("testStartTime");
    }

    // 카카오 SDK 로드
    loadKakaoSDK().catch(console.error);
  }, [personalityType.id, startTime]);

  useEffect(() => {
    // DB에서 실시간 통계 가져오기 (한 번만)
    if (!hasLoadedStats.current) {
      hasLoadedStats.current = true;
      fetchDbStats();
    }
  }, []);

  const fetchDbStats = async () => {
    try {
      console.log("통계 API 호출 시작");
      const response = await fetch("/api/stats");
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setDbStats(result.data);
          console.log("통계 데이터 로드 완료:", result.data);
        }
      }
    } catch (error) {
      console.error("통계 조회 실패:", error);
    }
  };

  const handleKakaoShare = () => {
    shareToKakao(result);
    setShareMessage("카카오톡으로 공유했습니다!");
    setTimeout(() => setShareMessage(""), 3000);
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(result);
    if (success) {
      setShareMessage("링크가 클립보드에 복사되었습니다!");
    } else {
      setShareMessage("링크 복사에 실패했습니다.");
    }
    setTimeout(() => setShareMessage(""), 3000);
  };

  const handleCapture = async () => {
    try {
      setShareMessage("이미지를 생성 중입니다...");

      const success = await captureResult(
        "result-content",
        `${personalityType.name}-결과.png`
      );

      if (success) {
        setShareMessage("결과가 이미지로 저장되었습니다!");
      } else {
        // 실패 시 새 탭에서 보기 시도
        const tabSuccess = await showImageInNewTab("result-content");
        if (tabSuccess) {
          setShareMessage(
            "새 탭에서 이미지를 확인하세요! 우클릭하여 저장할 수 있습니다."
          );
        } else {
          setShareMessage("이미지 저장에 실패했습니다.");
        }
      }
    } catch (error) {
      console.error("캡쳐 에러:", error);
      setShareMessage("이미지 저장 중 오류가 발생했습니다.");
    }
    setTimeout(() => setShareMessage(""), 3000);
  };

  // DB 통계 우선, fallback으로 로컬 통계 사용
  const displayTotalTests = dbStats?.total || stats.totalTests || 0;
  const displayAvgTime =
    dbStats?.avgCompletionTime || stats.averageCompletionTime || 0;

  const popularTypeId = dbStats
    ? Object.keys(dbStats.byType || {}).reduce((a, b) =>
        (dbStats.byType[a]?.count || 0) > (dbStats.byType[b]?.count || 0)
          ? a
          : b
      )
    : getMostPopularType();
  const popularType = popularTypeId
    ? personalityTypes.find((t) => t.id === popularTypeId)
    : null;

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl mx-auto"
      >
        {shareMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed z-50 px-6 py-3 text-white transform -translate-x-1/2 bg-green-500 rounded-lg shadow-lg top-4 left-1/2"
          >
            {shareMessage}
          </motion.div>
        )}

        <div id="result-content" className="capture-area">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <div className="flex justify-center mb-6">
              <Character type={personalityType.character} size={160} />
            </div>
            <h1 className="mb-2 text-3xl font-bold text-gray-800 md:text-4xl">
              {personalityType.name}
            </h1>
            <p className="mb-6 text-lg text-gray-600">
              {personalityType.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="p-6 mb-6 modern-card rounded-2xl md:p-8"
            style={{ borderColor: personalityType.color + "30" }}
          >
            <div className="space-y-8">
              <div>
                <div className="flex items-center mb-3 space-x-2">
                  <LightbulbIcon size={15} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">주요 특징</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {personalityType.traits.map((trait, index) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="px-4 py-2 text-sm font-medium text-white rounded-full shadow-lg"
                      style={{ backgroundColor: personalityType.color }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3 space-x-2">
                  <BookIcon size={15} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">
                    내가 어떤 유형인지
                  </h3>
                </div>
                <div className="leading-relaxed text-gray-700">
                  {personalityType.detailedDescription.map((data) => {
                    return (
                      <div key={data} className="mb-1">
                        # {data}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3 space-x-2">
                  <HeartIcon size={15} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">
                    나에게 필요한 것
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {personalityType.needs.map((need, index) => (
                    <motion.div
                      key={need}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="p-4 text-center border-l-4 rounded-lg"
                      style={{
                        borderLeftColor: personalityType.color,
                        backgroundColor: `rgba(${parseInt(
                          personalityType.color.slice(1, 3),
                          16
                        )}, ${parseInt(
                          personalityType.color.slice(3, 5),
                          16
                        )}, ${parseInt(
                          personalityType.color.slice(5, 7),
                          16
                        )}, 0.15)`,
                      }}
                    >
                      <span className="font-medium text-gray-700">{need}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3 space-x-2">
                  <WarningIcon size={15} color="#F59E0B" />
                  <h3 className="font-semibold text-gray-800">
                    내가 삐뚤어지면
                  </h3>
                </div>
                <div className="p-4 bg-[#fffcf1] rounded-lg border-l-4 border-yellow-400">
                  <div className="leading-relaxed text-gray-700">
                    {personalityType.whenDistorted.map((data, i) => {
                      return (
                        <div key={i} className="mb-1">
                          - {data}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-3 space-x-2">
                  <CheckIcon size={15} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">추천 직무</h3>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {personalityType.recommendedJobs.map((job, index) => (
                    <motion.div
                      key={job}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                      className="p-4 text-center rounded-lg bg-gray-50"
                    >
                      <span className="font-medium text-gray-700">{job}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          {displayTotalTests > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="p-6 mb-6 modern-card rounded-xl"
            >
              <div className="flex items-center mb-4 space-x-2">
                <TrendingUpIcon size={15} color="#6B7280" />
                <h3 className="font-semibold text-gray-800">테스트 통계</h3>
              </div>
              <div className="grid grid-cols-1 gap-4 text-center md:grid-cols-3">
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50">
                  <div className="text-2xl font-bold text-black">
                    {displayTotalTests}
                  </div>
                  <div className="text-sm text-gray-600">총 테스트 횟수</div>
                </div>
                {popularType && (
                  <div className="p-3 rounded-lg bg-gray-50">
                    <div className="flex items-center justify-center mb-6">
                      <Character type={popularType.character} size={100} />
                    </div>
                    <div className="text-sm font-bold text-black">
                      {popularType.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      가장 많은 유형
                      {dbStats &&
                        popularTypeId &&
                        dbStats.byType[popularTypeId] && (
                          <span className="block text-xs">
                            ({dbStats.byType[popularTypeId].count}명,{" "}
                            {dbStats.byType[popularTypeId].percentage}%)
                          </span>
                        )}
                    </div>
                  </div>
                )}
                <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-gray-50">
                  <div className="text-lg font-bold text-black">
                    {dbStats
                      ? `${displayAvgTime}초`
                      : formatCompletionTime(displayAvgTime)}
                  </div>
                  <div className="text-sm text-gray-600">평균 소요 시간</div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* 공유 버튼 섹션 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="my-10"
        >
          <div className="flex items-center justify-center mt-10 mb-4 space-x-2">
            <ShareIcon size={15} color="#6B7280" />
            <h3 className="font-semibold text-gray-800">결과 공유하기</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleKakaoShare}
              className="flex items-center justify-center px-3 py-3 space-x-2 font-semibold text-gray-800 transition-colors bg-yellow-400 rounded-full hover:bg-yellow-500"
            >
              <KakaoIcon size={15} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyLink}
              className="flex items-center justify-center px-3 py-3 space-x-2 font-semibold text-white transition-colors bg-blue-500 rounded-full hover:bg-blue-600"
            >
              <LinkIcon size={15} color="white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCapture}
              className="flex items-center justify-center px-3 py-3 space-x-2 font-semibold text-white transition-colors bg-green-500 rounded-full hover:bg-green-600"
            >
              <CameraIcon size={15} color="white" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col justify-center gap-4 sm:flex-row"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShowAllResults}
            className="flex items-center justify-center px-8 py-3 space-x-2 font-semibold modern-button modern-button-primary rounded-xl"
          >
            <BookIcon size={15} color="white" />
            <span>모든 결과 보기</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="flex items-center justify-center px-8 py-3 space-x-2 font-semibold modern-button modern-button-purple rounded-xl"
          >
            <RefreshIcon size={15} color="white" />
            <span>다시 테스트하기</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
