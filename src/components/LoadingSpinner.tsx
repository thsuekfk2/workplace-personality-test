'use client';

import { motion } from 'framer-motion';

interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({ text = "로딩 중..." }: LoadingSpinnerProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glassmorphism rounded-2xl p-8 text-center"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
        />
        <p className="text-gray-700 font-medium">{text}</p>
      </motion.div>
    </div>
  );
}