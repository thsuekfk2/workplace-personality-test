import { PersonalityType, PersonalityWeights, TestResult } from "./types";
import { questions, personalityTypes } from "./data";

export function calculateResult(answers: Array<"a" | "b">): TestResult {
  const scores: PersonalityWeights = {
    extrovert: 0,
    introvert: 0,
    emotion: 0,
    thought: 0,
  };

  answers.forEach((answer, index) => {
    const question = questions[index];
    const weights = question.weights[answer];

    Object.keys(weights).forEach((key) => {
      const personalityKey = key as keyof PersonalityWeights;
      scores[personalityKey] += weights[personalityKey];
    });
  });

  // 유형 코드 계산
  // 첫 번째 문자 (내향/외향): 내향이 높으면 b, 외향이 높으면 a
  const firstChar = scores.introvert > scores.extrovert ? "b" : "a";

  // 두 번째 문자 (감정/사고): 감정이 높으면 a, 사고가 높으면 b
  const secondChar = scores.emotion > scores.thought ? "a" : "b";

  // 최종 유형 코드
  const typeCode = firstChar + secondChar;

  // typeCode에 맞는 personalityType 찾기
  const personalityType = personalityTypes.find(
    (type) => type.type === typeCode
  ) as PersonalityType;

  console.log("firstpersonalityType", personalityType);
  return {
    personalityType,
    scores,
    answers,
  };
}

export function saveTestProgress(
  currentQuestion: number,
  answers: Array<"a" | "b">
) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "testProgress",
      JSON.stringify({
        currentQuestion,
        answers,
        timestamp: Date.now(),
      })
    );
  }
}

export function loadTestProgress(): {
  currentQuestion: number;
  answers: Array<"a" | "b">;
} | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("testProgress");
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
  if (typeof window !== "undefined") {
    localStorage.removeItem("testProgress");
  }
}

export function saveTestResult(result: TestResult) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      "lastTestResult",
      JSON.stringify({
        result,
        timestamp: Date.now(),
      })
    );
  }
}

export function getLastTestResult(): TestResult | null {
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("lastTestResult");
    if (saved) {
      const data = JSON.parse(saved);
      return data.result;
    }
  }
  return null;
}

export function clearTestResult() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("lastTestResult");
  }
}
