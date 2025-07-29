"use client";

import { motion, AnimatePresence } from "motion/react";
import { TestState, TestResult } from "@/lib/types";
import { questions } from "@/lib/data";
import { calculateResult, saveTestProgress } from "@/lib/testLogic";
import { useState } from "react";
import { ArrowLeftIcon } from "@/components/ModernIcons";
import ErrorModal from "@/components/ErrorModal";

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
  const [userId, setUserId] = useState<string>(""); // 사용자 ID 상태 관리
  const [isProcessing, setIsProcessing] = useState<boolean>(false); // API 요청 중 상태
  const [errorMessage, setErrorMessage] = useState<string>(""); // 에러 메시지
  const [retryCount, setRetryCount] = useState<number>(0); // 재시도 횟수
  const currentQuestion = questions[testState.currentQuestion];
  const progress = ((testState.currentQuestion + 1) / questions.length) * 100;

  // Supabase 직접 저장 로직
  const saveAnswerDirectly = async (
    userId: string,
    questionNumber: number,
    answer: "a" | "b",
    maxRetries = 2
  ): Promise<{ success: boolean; userId: string }> => {
    const { saveTestAnswer } = await import("@/lib/supabase");
    const { questions } = await import("@/lib/data");

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        // 첫 번째 답안이면 사용자 ID 생성
        const currentUserId =
          userId ||
          `user_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;

        // 첫 번째 답안이면 세션 생성 (디바이스/위치 정보 포함)
        if (!userId) {
          const { saveTestSession } = await import("@/lib/supabase");
          
          // 디바이스 정보 수집
          const { getDeviceInfo, getReferrer, getLocationInfo } = await import("@/lib/deviceDetection");
          const deviceInfo = getDeviceInfo();
          const referrer = getReferrer();
          
          // 위치 정보 비동기 수집 (실패해도 계속 진행)
          let locationInfo = {
            country: "unknown",
            region: "unknown", 
            city: "unknown",
          };
          
          try {
            locationInfo = await getLocationInfo();
          } catch (error) {
            console.warn("위치 정보 수집 실패:", error);
          }

          // IP 주소 처리 (해싱)
          const hashedIp = typeof window !== "undefined" && window.location 
            ? btoa(window.location.hostname).slice(0, 10) 
            : "unknown";

          const sessionResult = await saveTestSession({
            user_id: currentUserId,
            current_question: 0,
            session_time: 0,
            is_complete: false,
            referrer,
            ...locationInfo,
            ...deviceInfo,
            user_agent: typeof window !== "undefined" ? navigator.userAgent : "unknown",
            ip_address: hashedIp,
          });

          if (!sessionResult.success) {
            throw new Error(String(sessionResult.error) || "세션 생성 실패");
          }
        }

        // 답안 저장
        const currentQuestion = questions[questionNumber];
        const weights = currentQuestion?.weights[answer];

        const weightedTypes: string[] = [];
        if (weights) {
          Object.entries(weights).forEach(([type, weight]) => {
            if (weight === 1) {
              weightedTypes.push(type);
            }
          });
        }

        const answerData = {
          user_id: currentUserId,
          question_number: questionNumber,
          answer: answer,
          answer_value: (answer === "a" ? 1 : 2) as 1 | 2,
          weighted_types: weightedTypes,
        };

        const answerResult = await saveTestAnswer(answerData);

        if (answerResult.success) {
          console.log("답안 저장 성공:", answerData);
          return { success: true, userId: currentUserId };
        } else {
          throw new Error(String(answerResult.error) || "답안 저장 실패");
        }
      } catch (error) {
        console.error(`답안 저장 시도 ${attempt + 1} 실패:`, error);
        if (attempt === maxRetries) {
          throw error;
        }
        // 재시도 전 잠시 대기
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1))
        );
      }
    }
    return { success: false, userId: userId || "" };
  };

  const handlePrevious = () => {
    if (testState.currentQuestion > 0 && !isProcessing) {
      const newState = {
        ...testState,
        currentQuestion: testState.currentQuestion - 1,
      };
      setTestState(newState);
      saveTestProgress(newState.currentQuestion, newState.answers);
      setErrorMessage(""); // 이전 문항으로 가면 에러 메시지 초기화
    }
  };

  const handleAnswer = async (answer: "a" | "b") => {
    // 이미 처리 중이면 무시
    if (isProcessing) {
      return;
    }

    setIsProcessing(true); // API 요청 시작

    const newAnswers = [...testState.answers];
    newAnswers[testState.currentQuestion] = answer;

    const newState = {
      ...testState,
      answers: newAnswers,
    };

    // Supabase에 직접 답안 저장
    try {
      const result = await saveAnswerDirectly(
        userId,
        testState.currentQuestion,
        answer
      );

      if (!result.success) {
        setErrorMessage("답변 저장에 실패했습니다. 다시 시도해주세요.");
        setRetryCount((prev) => prev + 1);
        setIsProcessing(false);
        return;
      }

      // 사용자 ID 업데이트
      if (result.userId && !userId) {
        setUserId(result.userId);
      }

      setErrorMessage("");
      setRetryCount(0);
    } catch (error: unknown) {
      console.error("답안 저장 오류:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "예상치 못한 오류가 발생했습니다. 다시 시도해주세요."
      );
      setRetryCount((prev) => prev + 1);
      setIsProcessing(false);
      return;
    } finally {
      setIsProcessing(false);
    }

    if (testState.currentQuestion < questions.length - 1) {
      newState.currentQuestion = testState.currentQuestion + 1;
      setTestState(newState);
      saveTestProgress(newState.currentQuestion, newAnswers);
    } else {
      // 마지막 질문인 경우 결과 계산 후 완료 처리
      const result = calculateResult(newAnswers);
      onComplete(result);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              {testState.currentQuestion > 0 && (
                <motion.button
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevious}
                  disabled={isProcessing}
                  className={`flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all ${
                    isProcessing
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                  title="이전 문항"
                >
                  <ArrowLeftIcon size={18} />
                  <span className="text-sm font-medium ">이전</span>
                </motion.button>
              )}
            </div>
            <span className="text-sm text-gray-600 h-[40px] flex items-center">
              {testState.currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full h-3 rounded-full modern-progress">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              className="h-3 rounded-full modern-progress-bar"
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
            className="p-6 modern-card rounded-2xl md:p-8"
          >
            <div className="text-center my-[60px]">
              <h2 className="mb-6 text-xl font-bold text-gray-800 md:text-2xl">
                {currentQuestion.text}
              </h2>
            </div>
            <div className="space-y-5">
              <motion.button
                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer("a")}
                disabled={isProcessing}
                className={`w-full p-5 md:p-6 text-left option-card option-card-blue rounded-xl group touch-target ${
                  isProcessing
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold mr-4 transition-transform ${
                      !isProcessing ? "group-hover:scale-110" : ""
                    }`}
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white rounded-full border-t-transparent"
                      />
                    ) : (
                      "A"
                    )}
                  </div>
                  <p
                    className={`font-medium leading-relaxed ${
                      !isProcessing
                        ? "text-gray-700 group-hover:text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {currentQuestion.options.a}
                  </p>
                </div>
              </motion.button>

              <motion.button
                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer("b")}
                disabled={isProcessing}
                className={`w-full p-5 md:p-6 text-left option-card option-card-purple rounded-xl group touch-target ${
                  isProcessing
                    ? "opacity-50 cursor-not-allowed pointer-events-none"
                    : ""
                }`}
              >
                <div className="flex items-center">
                  <div
                    className={`w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold mr-4 transition-transform ${
                      !isProcessing ? "group-hover:scale-110" : ""
                    }`}
                  >
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white rounded-full border-t-transparent"
                      />
                    ) : (
                      "B"
                    )}
                  </div>
                  <p
                    className={`font-medium leading-relaxed ${
                      !isProcessing
                        ? "text-gray-700 group-hover:text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    {currentQuestion.options.b}
                  </p>
                </div>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
        {/* 에러 모달 */}
        <ErrorModal
          isOpen={!!errorMessage}
          errorMessage={errorMessage}
          retryCount={retryCount}
          isProcessing={isProcessing}
          onClose={() => setErrorMessage("")}
          onRetry={() => {
            setErrorMessage("");
            const lastAnswer = testState.answers[testState.currentQuestion];
            if (lastAnswer) {
              handleAnswer(lastAnswer);
            }
          }}
          onContinueWithoutSaving={() => {
            setErrorMessage("");
            const newState = {
              ...testState,
              answers: [...testState.answers],
            };
            if (testState.currentQuestion < questions.length - 1) {
              newState.currentQuestion = testState.currentQuestion + 1;
              setTestState(newState);
              saveTestProgress(newState.currentQuestion, newState.answers);
            } else {
              const result = calculateResult(newState.answers);
              onComplete(result);
            }
          }}
        />
      </motion.div>
    </div>
  );
}
