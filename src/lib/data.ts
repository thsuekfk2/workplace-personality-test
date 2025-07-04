import { Question, PersonalityType } from './types';

export const questions: Question[] = [
  {
    id: 1,
    text: "새로운 프로젝트가 시작될 때 나는",
    options: {
      a: "적극적으로 나서서 팀을 이끌고 추진한다",
      b: "신중하게 분석하고 객관적인 조언을 제공한다"
    },
    weights: {
      a: { advisor: 0, peacemaker: 0, leader: 3, optimist: 2 },
      b: { advisor: 3, peacemaker: 1, leader: 0, optimist: 0 }
    }
  },
  {
    id: 2,
    text: "팀 회의에서 나는",
    options: {
      a: "활발하게 의견을 나누며 분위기를 밝게 만든다",
      b: "모든 사람의 의견을 들으며 조화를 추구한다"
    },
    weights: {
      a: { advisor: 1, peacemaker: 0, leader: 2, optimist: 3 },
      b: { advisor: 0, peacemaker: 3, leader: 0, optimist: 1 }
    }
  },
  {
    id: 3,
    text: "업무 우선순위를 정할 때 나는",
    options: {
      a: "과감하게 결정하고 빠르게 실행에 옮긴다",
      b: "여러 관점을 고려하여 신중하게 판단한다"
    },
    weights: {
      a: { advisor: 0, peacemaker: 0, leader: 3, optimist: 2 },
      b: { advisor: 3, peacemaker: 2, leader: 0, optimist: 0 }
    }
  },
  {
    id: 4,
    text: "동료가 어려움을 겪을 때 나는",
    options: {
      a: "따뜻하게 위로하고 정서적 지지를 제공한다",
      b: "솔직하고 현실적인 조언을 제공한다"
    },
    weights: {
      a: { advisor: 0, peacemaker: 3, leader: 0, optimist: 2 },
      b: { advisor: 3, peacemaker: 0, leader: 1, optimist: 0 }
    }
  },
  {
    id: 5,
    text: "프레젠테이션을 준비할 때 나는",
    options: {
      a: "재미있고 흥미로운 요소를 넣어 청중을 사로잡는다",
      b: "명확하고 논리적인 구조로 핵심을 전달한다"
    },
    weights: {
      a: { advisor: 0, peacemaker: 1, leader: 2, optimist: 3 },
      b: { advisor: 3, peacemaker: 0, leader: 1, optimist: 0 }
    }
  },
  {
    id: 6,
    text: "마감 시간이 촉박할 때 나는",
    options: {
      a: "긍정적인 에너지로 팀원들의 사기를 높인다",
      b: "차분하게 상황을 정리하고 현실적 대안을 제시한다"
    },
    weights: {
      a: { advisor: 0, peacemaker: 1, leader: 2, optimist: 3 },
      b: { advisor: 3, peacemaker: 2, leader: 0, optimist: 0 }
    }
  },
  {
    id: 7,
    text: "새로운 업무 프로세스를 도입할 때 나는",
    options: {
      a: "자신감 있게 주도하며 빠르게 적용한다",
      b: "모든 사람의 의견을 수렴하여 신중하게 진행한다"
    },
    weights: {
      a: { advisor: 1, peacemaker: 0, leader: 3, optimist: 2 },
      b: { advisor: 2, peacemaker: 3, leader: 0, optimist: 0 }
    }
  },
  {
    id: 8,
    text: "팀 갈등이 발생했을 때 나는",
    options: {
      a: "따뜻하게 중재하며 모든 사람이 편안하도록 노력한다",
      b: "직설적으로 문제를 지적하고 현실적 해결책을 제시한다"
    },
    weights: {
      a: { advisor: 0, peacemaker: 3, leader: 1, optimist: 1 },
      b: { advisor: 3, peacemaker: 0, leader: 2, optimist: 0 }
    }
  },
  {
    id: 9,
    text: "업무 성과를 평가할 때 나는",
    options: {
      a: "팀원들의 노력과 협업 과정을 중요하게 본다",
      b: "결과와 성과를 솔직하고 객관적으로 평가한다"
    },
    weights: {
      a: { advisor: 0, peacemaker: 3, leader: 1, optimist: 2 },
      b: { advisor: 3, peacemaker: 0, leader: 2, optimist: 0 }
    }
  },
  {
    id: 10,
    text: "이상적인 업무 환경은",
    options: {
      a: "활기차고 열정적인 분위기에서 사람들과 함께 일하는 환경",
      b: "상호 존중하고 평화로운 분위기에서 일하는 환경"
    },
    weights: {
      a: { advisor: 1, peacemaker: 0, leader: 2, optimist: 3 },
      b: { advisor: 2, peacemaker: 3, leader: 0, optimist: 0 }
    }
  }
];

export const personalityTypes: PersonalityType[] = [
  {
    id: 'advisor',
    name: '솔직한 조언가',
    description: '진실되고 객관적인 조언을 제공하는 신뢰할 수 있는 동료',
    traits: ['솔직함', '객관적', '신뢰성', '분석적'],
    recommendedJobs: ['컨설턴트', '멘토', '코치', '분석가'],
    color: '#9B59B6',
    character: 'advisor',
    detailedDescription: '항상 솔직하고 진실된 피드백을 제공합니다. 감정에 휘둘리지 않고 객관적인 관점에서 조언하며, 동료들에게 신뢰받는 존재입니다.',
    needs: ['명확한 기준과 원칙', '진실한 소통', '논리적 근거', '전문성 인정'],
    whenDistorted: '지나치게 비판적이 되어 다른 사람의 감정을 무시하고, 완벽주의에 빠져 융통성을 잃을 수 있습니다.'
  },
  {
    id: 'peacemaker',
    name: '배려가 넘치는 따뜻한 평화주의자',
    description: '모든 사람을 배려하며 조화로운 환경을 만드는 마음 따뜻한 동료',
    traits: ['배려심', '평화주의', '공감능력', '조화추구'],
    recommendedJobs: ['HR', '고객서비스', '복지', '상담'],
    color: '#F39C12',
    character: 'peacemaker',
    detailedDescription: '모든 사람을 세심하게 배려하고 갈등을 중재하여 평화로운 분위기를 만듭니다. 따뜻한 마음으로 팀의 화합을 이끌어냅니다.',
    needs: ['조화로운 환경', '감정적 안정', '인정과 격려', '갈등 없는 소통'],
    whenDistorted: '갈등을 회피하려다 중요한 문제를 외면하고, 자신의 의견을 숨기며 스트레스를 혼자 감당할 수 있습니다.'
  },
  {
    id: 'leader',
    name: '진취적이며 자신감 넘치는 행동대장',
    description: '적극적으로 행동하며 팀을 이끄는 카리스마 넘치는 리더',
    traits: ['진취적', '자신감', '리더십', '추진력'],
    recommendedJobs: ['팀장', '영업관리', '사업개발', '프로젝트 리더'],
    color: '#E74C3C',
    character: 'leader',
    detailedDescription: '자신감 넘치는 태도로 팀을 이끌고 적극적으로 행동합니다. 진취적인 성격으로 새로운 도전을 두려워하지 않으며 강한 추진력을 발휘합니다.',
    needs: ['명확한 목표와 비전', '권한과 책임', '빠른 의사결정', '성과 인정'],
    whenDistorted: '독단적이 되어 다른 사람의 의견을 무시하고, 성급한 판단으로 팀에 부담을 줄 수 있습니다.'
  },
  {
    id: 'optimist',
    name: '낙천적으로 사교적인 배짱이',
    description: '긍정적이고 사교적인 에너지로 분위기를 밝게 만드는 활력소',
    traits: ['낙천적', '사교적', '긍정적', '활력'],
    recommendedJobs: ['마케터', '영업', '이벤트 기획', '홍보'],
    color: '#45B7D1',
    character: 'optimist',
    detailedDescription: '항상 긍정적이고 낙천적인 태도로 주변을 밝게 만듭니다. 뛰어난 사교성으로 사람들과 쉽게 어울리며 팀에 활력을 불어넣습니다.',
    needs: ['다양한 자극과 변화', '사람들과의 교류', '자유로운 분위기', '창의적 표현'],
    whenDistorted: '현실을 외면하고 지나치게 낙관적이 되어, 세밀한 계획이나 꼼꼼한 실행을 소홀히 할 수 있습니다.'
  }
];