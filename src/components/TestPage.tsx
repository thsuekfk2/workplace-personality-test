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

  // API 재시도 로직
  const saveProgressWithRetry = async (
    requestData: Record<string, unknown>,
    maxRetries = 2
  ): Promise<boolean> => {
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        console.log(
          `진행 상황 저장 시도 ${attempt + 1}/${maxRetries + 1}:`,
          requestData
        );

        const response = await fetch("/api/save-progress", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        const responseData = await response.json();

        if (response.ok) {
          console.log("진행 상황 저장 성공:", responseData);
          // 서버에서 반환된 사용자 ID 저장
          if (responseData.user_id && !userId) {
            setUserId(responseData.user_id);
          }
          setErrorMessage(""); // 에러 메시지 초기화
          setRetryCount(0); // 재시도 횟수 초기화
          return true;
        } else {
          console.error(
            "진행 상황 저장 API 오류:",
            response.status,
            responseData
          );
          if (attempt === maxRetries) {
            throw new Error(
              `서버 오류 (${response.status}): ${
                responseData.message || "알 수 없는 오류"
              }`
            );
          }
        }
      } catch (error) {
        console.error(
          `진행 상황 저장 네트워크 오류 (시도 ${attempt + 1}):`,
          error
        );
        if (attempt === maxRetries) {
          throw error;
        }
        // 재시도 전 잠시 대기
        await new Promise((resolve) =>
          setTimeout(resolve, 1000 * (attempt + 1))
        );
      }
    }
    return false;
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

    // 매번 답안을 서버에 저장
    try {
      const { getDeviceInfo, getReferrer, getLocationInfo } = await import(
        "@/lib/deviceDetection"
      );

      const now = Date.now();
      const completionTime = testState.startTime
        ? Math.floor((now - testState.startTime) / 1000)
        : 0;
      const sessionTime = testState.sessionStartTime
        ? Math.floor((now - testState.sessionStartTime) / 1000)
        : 0;

      // 디바이스 정보 수집 (첫 번째 답안에서만)
      let deviceInfo = {};
      let referrer = "";
      let locationInfo = {
        country: "unknown",
        region: "unknown",
        city: "unknown",
      };

      if (testState.currentQuestion === 0) {
        deviceInfo = getDeviceInfo();
        referrer = getReferrer();

        // 위치 정보 비동기 수집 (실패해도 계속 진행)
        try {
          locationInfo = await getLocationInfo();
        } catch (error) {
          console.warn("위치 정보 수집 실패:", error);
        }
      }

      const isLastQuestion = testState.currentQuestion === questions.length - 1;
      const result = isLastQuestion ? calculateResult(newAnswers) : null;

      const requestData = {
        user_id: userId || undefined, // 기존 사용자 ID 전달
        current_question: testState.currentQuestion,
        answer: answer,
        completion_time: completionTime,
        session_time: sessionTime,
        is_complete: isLastQuestion,

        // 테스트 완료 시 결과 정보 추가
        ...(isLastQuestion &&
          result && {
            result_type: result.personalityType.id,
            result_name: result.personalityType.name,
            result_type_code: result.personalityType.type, // aa, ab, bb, ba
          }),

        ...(testState.currentQuestion === 0 && {
          referrer,
          ...locationInfo,
          ...deviceInfo,
          user_agent:
            typeof window !== "undefined" ? navigator.userAgent : "unknown",
        }),
      };

      // 재시도 로직으로 저장 시도
      const success = await saveProgressWithRetry(requestData);

      if (!success) {
        // 모든 재시도 실패 시 에러 처리
        setErrorMessage(
          "답변 저장에 실패했습니다. 네트워크 연결을 확인하고 다시 시도해주세요."
        );
        setRetryCount((prev) => prev + 1);
        setIsProcessing(false);
        return; // 다음 문항으로 넘어가지 않음
      }
    } catch (error: unknown) {
      console.error("진행 상황 저장 중 예상치 못한 오류:", error);
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "예상치 못한 오류가 발생했습니다. 다시 시도해주세요."
      );
      setRetryCount((prev) => prev + 1);
      setIsProcessing(false);
      return; // 다음 문항으로 넘어가지 않음
    } finally {
      setIsProcessing(false); // API 요청 완료
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
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl mx-auto"
      >
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
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
                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                whileTap={!isProcessing ? { scale: 0.98 } : {}}
                onClick={() => handleAnswer("a")}
                disabled={isProcessing}
                className={`w-full p-5 md:p-6 text-left option-card option-card-blue rounded-xl group touch-target ${
                  isProcessing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold mr-4 transition-transform ${
                    !isProcessing ? "group-hover:scale-110" : ""
                  }`}>
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "A"
                    )}
                  </div>
                  <p className={`font-medium leading-relaxed ${
                    !isProcessing ? "text-gray-700 group-hover:text-gray-900" : "text-gray-700"
                  }`}>
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
                  isProcessing ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold mr-4 transition-transform ${
                    !isProcessing ? "group-hover:scale-110" : ""
                  }`}>
                    {isProcessing ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                    ) : (
                      "B"
                    )}
                  </div>
                  <p className={`font-medium leading-relaxed ${
                    !isProcessing ? "text-gray-700 group-hover:text-gray-900" : "text-gray-700"
                  }`}>
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
