"use client";

import { motion, AnimatePresence } from "motion/react";
import { TestState, TestResult } from "@/lib/types";
import { questions } from "@/lib/data";
import { calculateResult, saveTestProgress } from "@/lib/testLogic";

interface TestPageProps {
  testState: TestState;
  setTestState: (state: TestState) => void;
  onComplete: (result: TestResult) => void;
}

export default function TestPage({
  testState,
  setTestState,
  onComplete,
}: TestPageProps) {
  const currentQuestion = questions[testState.currentQuestion];
  const progress = ((testState.currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: "a" | "b") => {
    const newAnswers = [...testState.answers];
    newAnswers[testState.currentQuestion] = answer;

    const newState = {
      ...testState,
      answers: newAnswers,
    };

    if (testState.currentQuestion < questions.length - 1) {
      newState.currentQuestion = testState.currentQuestion + 1;
      setTestState(newState);
      saveTestProgress(newState.currentQuestion, newAnswers);
    } else {
      const result = calculateResult(newAnswers);
      onComplete(result);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600">
              {testState.currentQuestion + 1} / {questions.length}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="w-full modern-progress rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="modern-progress-bar h-3 rounded-full"
            />
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={testState.currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="modern-card rounded-2xl p-6 md:p-8"
          >
            <div className="text-center my-[60px]">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                {currentQuestion.text}
              </h2>
            </div>
            <div className="space-y-5">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer("a")}
                className="w-full p-5 md:p-6 text-left option-card option-card-blue rounded-xl group touch-target"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 group-hover:scale-110 transition-transform">
                    A
                  </div>
                  <p className="text-gray-700 group-hover:text-gray-900 font-medium leading-relaxed">
                    {currentQuestion.options.a}
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer("b")}
                className="w-full p-5 md:p-6 text-left option-card option-card-purple rounded-xl group touch-target"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 group-hover:scale-110 transition-transform">
                    B
                  </div>
                  <p className="text-gray-700 group-hover:text-gray-900 font-medium leading-relaxed">
                    {currentQuestion.options.b}
                  </p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
