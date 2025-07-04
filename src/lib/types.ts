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
  advisor: number;
  peacemaker: number;
  leader: number;
  optimist: number;
}

export interface PersonalityType {
  id: string;
  name: string;
  description: string;
  traits: string[];
  recommendedJobs: string[];
  color: string;
  character: string;
  detailedDescription: string;
  needs: string[];
  whenDistorted: string;
}

export interface TestResult {
  personalityType: PersonalityType;
  scores: PersonalityWeights;
  answers: Array<'a' | 'b'>;
}

export interface TestState {
  currentQuestion: number;
  answers: Array<'a' | 'b'>;
  isCompleted: boolean;
  result?: TestResult;
}