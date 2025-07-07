export interface Question {
  id: number;
  text: string;
  options: {
    a: string;
    b: string;
  };
  weights: {
    a: PersonalityWeights;
    b: PersonalityWeights;
  };
}

export interface PersonalityWeights {
  extrovert: number;
  introvert: number;
  emotion: number;
  thought: number;
}

export interface PersonalityType {
  id: string;
  type: "aa" | "ab" | "ba" | "bb";
  name: string;
  description: string;
  traits: string[];
  recommendedJobs: string[];
  color: string;
  character: string;
  detailedDescription: string[];
  needs: string[];
  whenDistorted: string[];
}

export interface TestResult {
  personalityType: PersonalityType;
  scores: PersonalityWeights;
  answers: Array<"a" | "b">;
}

export interface TestState {
  currentQuestion: number;
  answers: Array<"a" | "b">;
  isCompleted: boolean;
  result?: TestResult;
  startTime?: number;
  sessionStartTime?: number;
}
