import { PersonalityType, PersonalityWeights, TestResult } from './types';
import { questions, personalityTypes } from './data';

export function calculateResult(answers: Array<'a' | 'b'>): TestResult {
  const scores: PersonalityWeights = {
    advisor: 0,
    peacemaker: 0,
    leader: 0,
    optimist: 0
  };

  answers.forEach((answer, index) => {
    const question = questions[index];
    const weights = question.weights[answer];
    
    Object.keys(weights).forEach(key => {
      const personalityKey = key as keyof PersonalityWeights;
      scores[personalityKey] += weights[personalityKey];
    });
  });

  const maxScore = Math.max(...Object.values(scores));
  const topPersonalityId = Object.keys(scores).find(
    key => scores[key as keyof PersonalityWeights] === maxScore
  ) as string;

  const personalityType = personalityTypes.find(
    type => type.id === topPersonalityId
  ) as PersonalityType;

  return {
    personalityType,
    scores,
    answers
  };
}

export function saveTestProgress(currentQuestion: number, answers: Array<'a' | 'b'>) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('testProgress', JSON.stringify({
      currentQuestion,
      answers,
      timestamp: Date.now()
    }));
  }
}

export function loadTestProgress(): { currentQuestion: number; answers: Array<'a' | 'b'> } | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('testProgress');
    if (saved) {
      const data = JSON.parse(saved);
      const oneDay = 24 * 60 * 60 * 1000;
      if (Date.now() - data.timestamp < oneDay) {
        return { currentQuestion: data.currentQuestion, answers: data.answers };
      }
    }
  }
  return null;
}

export function clearTestProgress() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('testProgress');
  }
}

export function saveTestResult(result: TestResult) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('lastTestResult', JSON.stringify({
      result,
      timestamp: Date.now()
    }));
  }
}

export function getLastTestResult(): TestResult | null {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('lastTestResult');
    if (saved) {
      const data = JSON.parse(saved);
      return data.result;
    }
  }
  return null;
}