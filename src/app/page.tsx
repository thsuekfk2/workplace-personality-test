"use client";

import { useState, useEffect } from "react";
import StartPage from "@/components/StartPage";
import IntroPage from "@/components/IntroPage";
import TestPage from "@/components/TestPage";
import ResultPage from "@/components/ResultPage";
import AllResultsPage from "@/components/AllResultsPage";
import { TestState, TestResult } from "@/lib/types";
import {
  loadTestProgress,
  clearTestProgress,
  saveTestResult,
  getLastTestResult,
  clearTestResult,
} from "@/lib/testLogic";

export default function Home() {
  const [currentPage, setCurrentPage] = useState<
    "start" | "intro" | "test" | "result" | "allResults"
  >("start");
  const [testState, setTestState] = useState<TestState>({
    currentQuestion: 0,
    answers: [],
    isCompleted: false,
  });

  useEffect(() => {
    // 진행 중인 테스트가 있는지 확인
    const savedProgress = loadTestProgress();
    if (savedProgress && savedProgress.answers.length > 0) {
      setTestState((prev) => ({
        ...prev,
        currentQuestion: savedProgress.currentQuestion,
        answers: savedProgress.answers,
      }));
      return;
    }

    // 완료된 테스트 결과가 있는지 확인
    const savedResult = getLastTestResult();
    if (savedResult) {
      setTestState({
        currentQuestion: 10,
        answers: savedResult.answers,
        isCompleted: true,
        result: savedResult,
      });
      setCurrentPage("result");
    }
  }, []);

  const handleStartTest = () => {
    setCurrentPage("intro");
  };

  const handleIntroComplete = () => {
    setCurrentPage("test");
  };

  const handleTestComplete = (result: TestResult) => {
    setTestState((prev) => ({
      ...prev,
      isCompleted: true,
      result,
    }));
    setCurrentPage("result");
    clearTestProgress();
    saveTestResult(result); // 결과를 localStorage에 저장
  };

  const handleRestartTest = () => {
    setTestState({
      currentQuestion: 0,
      answers: [],
      isCompleted: false,
    });
    clearTestProgress();
    clearTestResult(); // 저장된 결과도 삭제
    setCurrentPage("start");
  };

  const handleShowAllResults = () => {
    setCurrentPage("allResults");
  };

  const handleBackToResult = () => {
    setCurrentPage("result");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {currentPage === "start" && <StartPage onStartTest={handleStartTest} />}
      {currentPage === "intro" && (
        <IntroPage onComplete={handleIntroComplete} />
      )}
      {currentPage === "test" && (
        <TestPage
          testState={testState}
          setTestState={setTestState}
          onComplete={handleTestComplete}
        />
      )}
      {currentPage === "result" && testState.result && (
        <ResultPage
          result={testState.result}
          onRestart={handleRestartTest}
          onShowAllResults={handleShowAllResults}
        />
      )}
      {currentPage === "allResults" && (
        <AllResultsPage
          onBack={handleBackToResult}
          onRestart={handleRestartTest}
        />
      )}
    </div>
  );
}
