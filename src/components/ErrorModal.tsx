"use client";

import { motion, AnimatePresence } from "motion/react";

interface ErrorModalProps {
  isOpen: boolean;
  errorMessage: string;
  retryCount: number;
  isProcessing: boolean;
  onClose: () => void;
  onRetry: () => void;
  onContinueWithoutSaving: () => void;
}

export default function ErrorModal({
  isOpen,
  errorMessage,
  retryCount,
  isProcessing,
  onClose,
  onRetry,
  onContinueWithoutSaving,
}: ErrorModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 모달 배경 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          
          {/* 모달 컨텐츠 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
              {/* 헤더 */}
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">연결 문제 발생</h3>
                    <p className="text-white/80 text-sm">답변을 저장하는 중 문제가 발생했습니다</p>
                  </div>
                </div>
              </div>
              
              {/* 바디 */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {errorMessage}
                  </p>
                  {retryCount > 0 && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-gray-500 text-xs">
                        재시도 횟수: {retryCount}회
                      </p>
                    </div>
                  )}
                </div>
                
                {/* 버튼 영역 */}
                <div className="flex flex-col space-y-2">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onRetry}
                    disabled={isProcessing}
                    className={`w-full px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl ${
                      isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>재시도 중...</span>
                      </div>
                    ) : (
                      '다시 시도'
                    )}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinueWithoutSaving}
                    className="w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200"
                  >
                    저장 없이 계속하기
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onClose}
                    className="w-full px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors duration-200"
                  >
                    취소
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}