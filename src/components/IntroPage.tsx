"use client";

import { motion } from "motion/react";
import {
  BookIcon,
  ClockIcon,
  LightbulbIcon,
  CheckIcon,
} from "@/components/ModernIcons";

interface IntroPageProps {
  onComplete: () => void;
}

export default function IntroPage({ onComplete }: IntroPageProps) {
  const handleStart = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("testStartTime", Date.now().toString());
    }
    onComplete();
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            테스트 안내사항
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="modern-card rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="space-y-6 text-left">
            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookIcon size={17} color="#3B82F6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  테스트 방법
                </h3>
                <p className="text-gray-600">
                  각 문항마다 두 가지 선택지 중 자신과 더 가까운 것을
                  선택해주세요. 정답은 없으니 솔직하게 답변해주세요.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <ClockIcon size={17} color="#10B981" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">소요 시간</h3>
                <p className="text-gray-600">
                  총 10문항으로 약 3-5분 정도 소요됩니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <CheckIcon size={17} color="#8B5CF6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">결과 확인</h3>
                <p className="text-gray-600">
                  4가지 직장인 유형 중 당신에게 맞는 유형을 찾아드리며, 각
                  유형별 특징과 추천 직무를 알려드립니다.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <LightbulbIcon size={17} color="#F59E0B" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">팁</h3>
                <p className="text-gray-600">
                  너무 오래 고민하지 마세요! <br />첫 번째 직감이 가장 정확한
                  답일 수 있습니다. 실제 직장에서의 경험을 떠올리며
                  답변해보세요.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleStart}
            className="modern-button modern-button-success py-4 px-8 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2"
          >
            <span>테스트 시작하기</span>
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}
