import { Question, PersonalityType } from "./types";

export const questions: Question[] = [
  {
    id: 1,
    text: "평소에 사람들과 대화할 때 나는",
    options: {
      a: "상대방의 말에 맞장구치면서 호응하는 편이다 ",
      b: "상대방의 말을 잘 들어주는 편이다",
    },
    weights: {
      a: { extrovert: 1, introvert: 0, emotion: 0, thought: 0 },
      b: { extrovert: 0, introvert: 1, emotion: 0, thought: 0 },
    },
  },
  {
    id: 2,
    text: "내 의견이 받아들여지지 않을 것 같은 상황에서 나는",
    options: {
      a: "그래도 일단 말해보는 편이다",
      b: "그렇다면 굳이 말하지 않는 편이다",
    },
    weights: {
      a: { extrovert: 1, introvert: 0, emotion: 0, thought: 0 },
      b: { extrovert: 0, introvert: 1, emotion: 0, thought: 0 },
    },
  },
  {
    id: 3,
    text: "평소에 나는",
    options: {
      a: "쾌활하고 말이 많은 것 같다",
      b: "신중하고 생각이 많은 것 같다",
    },
    weights: {
      a: { extrovert: 1, introvert: 0, emotion: 0, thought: 0 },
      b: { extrovert: 0, introvert: 1, emotion: 0, thought: 0 },
    },
  },
  {
    id: 4,
    text: "평소 업무 상황에서 나는",
    options: {
      a: "적극적으로 의견을 내는 편이다",
      b: "다른 사람의 의견을 지지하고 따르는 편이다",
    },
    weights: {
      a: { extrovert: 1, introvert: 0, emotion: 0, thought: 0 },
      b: { extrovert: 0, introvert: 1, emotion: 0, thought: 0 },
    },
  },
  {
    id: 5,
    text: "새로운 사람을 만나면 나는",
    options: {
      a: "대화를 이끌어가는 편이다",
      b: "가급적 필요한 이야기만 하는 편이다",
    },
    weights: {
      a: { extrovert: 1, introvert: 0, emotion: 0, thought: 0 },
      b: { extrovert: 0, introvert: 1, emotion: 0, thought: 0 },
    },
  },
  {
    id: 6,
    text: "내가 함께 일하고 싶은 사람은",
    options: {
      a: "친절하고 인간미가 있는 사람이다",
      b: "감정에 치우치지 않고 공정한 사람이다",
    },
    weights: {
      a: { extrovert: 0, introvert: 0, emotion: 1, thought: 0 },
      b: { extrovert: 0, introvert: 0, emotion: 0, thought: 1 },
    },
  },
  {
    id: 7,
    text: "내가 잘하는 것은",
    options: {
      a: "주변 사람을 즐겁게/기쁘게 하는 것이다",
      b: "다른 사람을 설명/설득하는 일이다",
    },
    weights: {
      a: { extrovert: 0, introvert: 0, emotion: 1, thought: 0 },
      b: { extrovert: 0, introvert: 0, emotion: 0, thought: 1 },
    },
  },
  {
    id: 8,
    text: "다른 사람과 대화 중 불편한 부분이 있을 때 나는",
    options: {
      a: "싫은 소리를 잘 못하고 참는 편이다",
      b: "상대가 싫어할 수 있어도 해야 할 말은 하는 편이다",
    },
    weights: {
      a: { extrovert: 0, introvert: 0, emotion: 1, thought: 0 },
      b: { extrovert: 0, introvert: 0, emotion: 0, thought: 1 },
    },
  },
  {
    id: 9,
    text: "평소 상대방이 고민 상담을 할 때 나는",
    options: {
      a: "공감과 위로를 하는 편이다",
      b: "해결 방안을 제시하는 편이다",
    },
    weights: {
      a: { extrovert: 0, introvert: 0, emotion: 1, thought: 0 },
      b: { extrovert: 0, introvert: 0, emotion: 0, thought: 1 },
    },
  },
  {
    id: 10,
    text: "나는 평소에 상대방으로부터 ",
    options: {
      a: "친절하고 따뜻한 사람이라는 소리를 듣는다",
      b: "합리적이고 논리적인 사람이라는 소리를 듣는다",
    },
    weights: {
      a: { extrovert: 0, introvert: 0, emotion: 1, thought: 0 },
      b: { extrovert: 0, introvert: 0, emotion: 0, thought: 1 },
    },
  },
];

export const personalityTypes: PersonalityType[] = [
  {
    id: "extrovert",
    type: "ab",
    name: "진취적이며 자신감 넘치는 행동대장",
    description: "적극적으로 행동하며 팀을 이끄는 카리스마 넘치는 리더",
    traits: ["진취적", "자신감", "리더십", "추진력"],
    recommendedJobs: ["팀장", "영업관리", "사업개발", "프로젝트 리더"],
    color: "#E74C3C",
    character: "extrovert",
    detailedDescription: [
      "주도적이고 적극적인",
      "성과/결과 창출을 중시하는",
      "빠르고 과감한 의사결정",
      "합리적이고 논리적으로 판단하는",
    ],
    needs: ["다른 사람의 인정과 존경", "권한"],
    whenDistorted: [
      "논리적으로 따지며 공격적인 행동을 함",
      "회사나 상사의 방침에 적극적으로 반항함",
      "문제를 찾아내고 이슈를 제기함",
      "불만이 있으면 바로 상부조직에 고발함",
    ],
  },

  {
    id: "introvert",
    type: "aa",
    name: "낙천적으로 사교적인 배짱이",
    description: "긍정적이고 사교적인 에너지로 분위기를 밝게 만드는 활력소",
    traits: ["낙천적", "사교적", "긍정적", "활력"],
    recommendedJobs: ["마케터", "영업", "이벤트 기획", "홍보"],
    color: "#45B7D1",
    character: "introvert",
    detailedDescription: [
      "관계 중심적이고 사교적인",
      "감정표현이 풍부한",
      "관심 받는 것을 즐기는",
      "계산적이지 않고 순진한",
    ],
    needs: ["다른 사람의 관심과 호감", "찬사"],
    whenDistorted: [
      "서운한 감정이 쌓이면 쉽게 토라짐",
      "감정적인 방식으로 주변과 대립함",
      "지나치게 외부활동에 많은 시간을 투자함",
      "상대가 논리적으로 설명하면 훈계를 한다고 생각함",
    ],
  },

  {
    id: "thought",
    type: "bb",
    name: "솔직한 조언가",
    description: "진실되고 객관적인 조언을 제공하는 신뢰할 수 있는 동료",
    traits: ["솔직함", "객관적", "신뢰성", "분석적"],
    recommendedJobs: ["컨설턴트", "멘토", "코치", "분석가"],
    color: "#9B59B6",
    character: "thought",
    detailedDescription: [
      "말수가 적고 신중함",
      "간단명료하게 자신의 생각을 표현함",
      "합리적이고 분석적인",
      "엄격하고 완벽주의적인",
    ],
    needs: ["다른 사람과의 신뢰관계와 공정성", "원리원칙"],
    whenDistorted: [
      "누군가 특혜를 받거나 공정성이 위배됐다고 생각하면 분노함",
      "신뢰관계를 잃은 상대방에게는 사소한 실수도 용납하지 않음",
      "새로운 일에 대해 부정적인 측면을 강조하고 냉소적임",
      "공정하지 않은 것에 분개하며 날카롭게 지적함",
    ],
  },
  {
    id: "emotion",
    type: "ba",
    name: "배려가 넘치는 따뜻한 평화주의자",
    description: "모든 사람을 배려하며 조화로운 환경을 만드는 마음 따뜻한 동료",
    traits: ["배려심", "평화주의", "공감능력", "조화추구"],
    recommendedJobs: ["HR", "고객서비스", "복지", "상담"],
    color: "#F39C12",
    character: "emotion",
    detailedDescription: [
      "논쟁보다 협력을 좋아하는",
      "모두를 존중하고 수용하는",
      "다른 사람에게 강요하지 않는",
      "조화를 위해 인내하는",
    ],
    needs: ["다른 사람의 지지와 확신", "평화"],
    whenDistorted: [
      "자신감이 떨어지고 자신을 스스로 평가절하함",
      "결정을 내려야 할 때 우유부단해하고 회피함",
      "수동적인 태도를 보이고 지나치게 높은 의존도를 보임",
      "자신감이 없어 동료들에게 짜증을 불러일으킴",
    ],
  },
];
