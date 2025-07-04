'use client';

import { useState, useEffect } from 'react';
import StartPage from '@/components/StartPage';
import IntroPage from '@/components/IntroPage';
import TestPage from '@/components/TestPage';
import ResultPage from '@/components/ResultPage';
import { TestState, TestResult } from '@/lib/types';
import { loadTestProgress, clearTestProgress } from '@/lib/testLogic';

export default function Home() {
  const [currentPage, setCurrentPage] = useState<'start' | 'intro' | 'test' | 'result'>('start');
  const [testState, setTestState] = useState<TestState>({
    currentQuestion: 0,
    answers: [],
    isCompleted: false
  });

  useEffect(() => {
    const saved = loadTestProgress();
    if (saved && saved.answers.length > 0) {
      setTestState(prev => ({
        ...prev,
        currentQuestion: saved.currentQuestion,
        answers: saved.answers
      }));
    }
  }, []);

  const handleStartTest = () => {
    setCurrentPage('intro');
  };

  const handleIntroComplete = () => {
    setCurrentPage('test');
  };

  const handleTestComplete = (result: TestResult) => {
    setTestState(prev => ({
      ...prev,
      isCompleted: true,
      result
    }));
    setCurrentPage('result');
    clearTestProgress();
  };

  const handleRestartTest = () => {
    setTestState({
      currentQuestion: 0,
      answers: [],
      isCompleted: false
    });
    clearTestProgress();
    setCurrentPage('start');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {currentPage === 'start' && (
        <StartPage onStartTest={handleStartTest} />
      )}
      {currentPage === 'intro' && (
        <IntroPage onComplete={handleIntroComplete} />
      )}
      {currentPage === 'test' && (
        <TestPage 
          testState={testState}
          setTestState={setTestState}
          onComplete={handleTestComplete}
        />
      )}
      {currentPage === 'result' && testState.result && (
        <ResultPage 
          result={testState.result}
          onRestart={handleRestartTest}
        />
      )}
    </div>
  );
}