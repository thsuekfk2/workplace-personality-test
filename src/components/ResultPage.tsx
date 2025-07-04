"use client";

import { motion } from "framer-motion";
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
  SparklesIcon,
  CheckIcon,
  BookIcon,
  HeartIcon,
  WarningIcon,
} from "@/components/ModernIcons";

interface ResultPageProps {
  result: TestResult;
  onRestart: () => void;
}

export default function ResultPage({ result, onRestart }: ResultPageProps) {
  const { personalityType, scores } = result;
  const [stats, setStats] = useState(getStats());
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
  }, [personalityType.id, startTime]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "직장인 유형 테스트 결과",
          text: `나의 직장인 유형은 "${personalityType.name}"입니다! 테스트해보세요.`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("공유 실패:", error);
      }
    } else {
      const text = `나의 직장인 유형은 "${personalityType.name}"입니다! 테스트해보세요: ${window.location.href}`;
      await navigator.clipboard.writeText(text);
      alert("결과가 클립보드에 복사되었습니다!");
    }
  };

  const maxScore = Math.max(...Object.values(scores));
  const otherScores = Object.entries(scores)
    .filter(([key]) => key !== personalityType.id)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

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
          <div className="mb-6">
            <div
              className="w-full h-4 rounded-full mb-2"
              style={{ backgroundColor: personalityType.color + "20" }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(maxScore / 30) * 100}%` }}
                transition={{ delay: 0.6, duration: 1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: personalityType.color }}
              />
            </div>
            <p className="text-sm text-gray-600 text-center">
              매치도: {Math.round((maxScore / 30) * 100)}%
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <SparklesIcon size={20} color="#6B7280" />
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
                <h3 className="font-semibold text-gray-800">내가 어떤 유형인지</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {personalityType.detailedDescription}
              </p>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <HeartIcon size={20} color="#6B7280" />
                <h3 className="font-semibold text-gray-800">나에게 필요한 것</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {personalityType.needs.map((need, index) => (
                  <motion.div
                    key={need}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="p-4 bg-green-50 rounded-lg text-center border-l-4"
                    style={{ borderLeftColor: personalityType.color }}
                  >
                    <span className="text-gray-700 font-medium">{need}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3">
                <WarningIcon size={20} color="#F59E0B" />
                <h3 className="font-semibold text-gray-800">내가 삐뚤어지면</h3>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <p className="text-gray-700 leading-relaxed">
                  {personalityType.whenDistorted}
                </p>
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
            <h3 className="font-semibold text-gray-800">다른 유형과의 비교</h3>
          </div>
          <div className="space-y-3">
            {otherScores.map(([type, score]) => (
              <div key={type} className="flex items-center">
                <div className="w-20 text-sm text-gray-600 capitalize">
                  {type}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-3">
                  <div
                    className="bg-gray-400 h-2 rounded-full"
                    style={{ width: `${(score / maxScore) * 100}%` }}
                  />
                </div>
                <div className="text-sm text-gray-600 w-8">{score}</div>
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
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.totalTests}
                </div>
                <div className="text-sm text-gray-600">총 테스트 횟수</div>
              </div>
              {popularType && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Character
                      type={popularType.character}
                      size={40}
                    />
                  </div>
                  <div className="text-sm font-bold text-green-600">
                    {popularType.name}
                  </div>
                  <div className="text-xs text-gray-600">가장 많은 유형</div>
                </div>
              )}
              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="text-lg font-bold text-purple-600">
                  {formatCompletionTime(stats.averageCompletionTime)}
                </div>
                <div className="text-sm text-gray-600">평균 소요 시간</div>
              </div>
            </div>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="modern-button modern-button-success px-8 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2"
          >
            <ShareIcon size={20} color="white" />
            <span>결과 공유하기</span>
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
