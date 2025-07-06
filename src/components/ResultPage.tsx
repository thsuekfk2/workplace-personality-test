"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
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
  BarChartIcon,
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
  const { personalityType, scores } = result;
  const [stats, setStats] = useState(getStats());
  const [shareMessage, setShareMessage] = useState("");
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

  const maxScore = Math.max(...Object.values(scores));

  const otherScores = Object.entries(scores)
    .map(([key, score]) => ({
      key: key,
      name: personalityTypeNames[key] || key,
      score: score,
    }))
    .filter((item) => item.key !== personalityType.id) // 현재 주 성격 타입 제외
    .sort((a, b) => b.score - a.score) // 점수 높은 순으로 정렬
    .slice(0, 3); // 상위 3개만

  console.log("Object.entries(scores)", Object.entries(scores));
  const popularTypeId = getMostPopularType();
  const popularType = popularTypeId
    ? personalityTypes.find((t) => t.id === popularTypeId)
    : null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
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
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg"
          >
            {shareMessage}
          </motion.div>
        )}

        <div id="result-content" className="capture-area">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-center mb-8"
          >
            <div className="mb-6 flex justify-center">
              <Character type={personalityType.character} size={160} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              {personalityType.name}
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              {personalityType.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="modern-card rounded-2xl p-6 md:p-8 mb-6"
            style={{ borderColor: personalityType.color + "30" }}
          >
            <div className="space-y-8">
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <LightbulbIcon size={20} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">주요 특징</h3>
                </div>
                <div className="flex flex-wrap gap-3">
                  {personalityType.traits.map((trait, index) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg"
                      style={{ backgroundColor: personalityType.color }}
                    >
                      {trait}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <BookIcon size={20} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">
                    내가 어떤 유형인지
                  </h3>
                </div>
                <div className="text-gray-700 leading-relaxed">
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
                <div className="flex items-center space-x-2 mb-3">
                  <HeartIcon size={20} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">
                    나에게 필요한 것
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {personalityType.needs.map((need, index) => (
                    <motion.div
                      key={need}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="p-4 rounded-lg text-center border-l-4"
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
                      <span className="text-gray-700 font-medium">{need}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <WarningIcon size={20} color="#F59E0B" />
                  <h3 className="font-semibold text-gray-800">
                    내가 삐뚤어지면
                  </h3>
                </div>
                <div className="p-4 bg-[#fffcf1] rounded-lg border-l-4 border-yellow-400">
                  <div className="text-gray-700 leading-relaxed">
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
                <div className="flex items-center space-x-2 mb-3">
                  <CheckIcon size={20} color="#6B7280" />
                  <h3 className="font-semibold text-gray-800">추천 직무</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {personalityType.recommendedJobs.map((job, index) => (
                    <motion.div
                      key={job}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.8 + index * 0.1 }}
                      className="p-4 bg-gray-50 rounded-lg text-center"
                    >
                      <span className="text-gray-700 font-medium">{job}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="modern-card rounded-xl p-6 mb-6"
          >
            <div className="flex items-center space-x-2 mb-4">
              <BarChartIcon size={20} color="#6B7280" />
              <h3 className="font-semibold text-gray-800">
                다른 유형과의 비교
              </h3>
            </div>
            <div className="space-y-3">
              {otherScores.map((item) => (
                <div key={item.key} className="flex items-center">
                  <div className="w-55 text-sm text-gray-600 capitalize">
                    {item.name}
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                    <div
                      className="bg-gray-400 h-2 rounded-full"
                      style={{ width: `${(item.score / maxScore) * 100}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-600 w-8">{item.score}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {stats.totalTests > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="modern-card rounded-xl p-6 mb-6"
            >
              <div className="flex items-center space-x-2 mb-4">
                <TrendingUpIcon size={20} color="#6B7280" />
                <h3 className="font-semibold text-gray-800">테스트 통계</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-blue-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {stats.totalTests}
                  </div>
                  <div className="text-sm text-gray-600">총 테스트 횟수</div>
                </div>
                {popularType && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center justify-center mb-6">
                      <Character type={popularType.character} size={100} />
                    </div>
                    <div className="text-sm font-bold text-green-600">
                      {popularType.name}
                    </div>
                    <div className="text-sm text-gray-600">가장 많은 유형</div>
                  </div>
                )}
                <div className="p-3 bg-purple-50 rounded-lg flex flex-col items-center justify-center">
                  <div className="text-lg font-bold text-purple-600">
                    {formatCompletionTime(stats.averageCompletionTime)}
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
          <div className="flex items-center justify-center space-x-2 mt-10 mb-4">
            <ShareIcon size={20} color="#6B7280" />
            <h3 className="font-semibold text-gray-800">결과 공유하기</h3>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleKakaoShare}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-800 rounded-full font-semibold transition-colors"
            >
              <KakaoIcon size={20} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCopyLink}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-semibold transition-colors"
            >
              <LinkIcon size={20} color="white" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleCapture}
              className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-semibold transition-colors"
            >
              <CameraIcon size={20} color="white" />
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onShowAllResults}
            className="modern-button modern-button-primary px-8 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <BookIcon size={20} color="white" />
            <span>모든 결과 보기</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onRestart}
            className="modern-button modern-button-purple px-8 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <RefreshIcon size={20} color="white" />
            <span>다시 테스트하기</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
