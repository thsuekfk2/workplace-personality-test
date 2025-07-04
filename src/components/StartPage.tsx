"use client";

import { motion } from "framer-motion";
import DisneyStyleCharacter from "@/components/DisneyStyleCharacters";
import {
  ClockIcon,
  ListIcon,
  WorkIcon,
  SparklesIcon,
} from "@/components/ModernIcons";

interface StartPageProps {
  onStartTest: () => void;
}

export default function StartPage({ onStartTest }: StartPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-10"
        >
          <h1 className="text-xl md:text-4xl font-bold text-gray-800 mb-4">
            직장인 유형 테스트
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
            직장에서의 나를 한마디로 표현하면?
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="modern-card rounded-2xl p-6 md:p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="mb-3 flex justify-center">
                <DisneyStyleCharacter type="advisor" size={60} />
              </div>
              <p className="text-sm text-gray-600">조언가</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="mb-3 flex justify-center">
                <DisneyStyleCharacter type="peacemaker" size={60} />
              </div>
              <p className="text-sm text-gray-600">평화주의자</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="mb-3 flex justify-center">
                <DisneyStyleCharacter type="leader" size={60} />
              </div>
              <p className="text-sm text-gray-600">행동대장</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="mb-3 flex justify-center">
                <DisneyStyleCharacter type="optimist" size={60} />
              </div>
              <p className="text-sm text-gray-600">배짱이</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <ClockIcon size={20} color="#6B7280" />
              <span className="text-gray-700 font-medium">약 3-5분</span>
            </div>
            <div className="flex items-center justify-center space-x-3 p-4 bg-gray-50 rounded-xl">
              <ListIcon size={20} color="#6B7280" />
              <span className="text-gray-700 font-medium">10개 문항</span>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onStartTest}
            className="w-full modern-button modern-button-primary py-4 px-8 rounded-xl text-lg font-semibold flex items-center justify-center space-x-2"
          >
            <SparklesIcon size={20} color="white" />
            <span>테스트 시작하기</span>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-sm text-gray-500 mt-6"
        >
          정답은 없습니다. 솔직하게 답해주세요!
        </motion.p>
      </motion.div>
    </div>
  );
}
