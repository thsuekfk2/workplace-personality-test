# 직장인 유형 테스트 🏢

나는 어떤 직장인일까? 10가지 질문으로 알아보는 나의 직장 성향 테스트입니다.

## 🌟 주요 기능

- **4가지 직장인 유형**: 진취적인 행동대장, 낙천적인 배짱이, 솔직한 조언가, 따뜻한 평화주의자
- **10문항 테스트**: 실제 직장 상황을 기반으로 한 질문들
- **개인화된 결과**: 유형별 특징, 필요한 것, 추천 직무, 주의사항 제공
- **진행 상황 저장**: 실시간 DB 저장 및 로컬 백업
- **강화된 공유 기능**:
  - 🎯 **카카오톡 공유**: 동적 OG 이미지와 함께 공유
  - 🔗 **링크 복사**: 결과별 전용 공유 URL
  - 📸 **이미지 저장**: 모바일 최적화된 결과 캡쳐
- **통계**: 테스트 참여자 수, 평균 소요시간, 인기 유형 표시
- **모든 결과 보기**: 4가지 유형 전체 정보 아코디언 UI
- **반응형 디자인**: 모바일/태블릿/데스크톱 완벽 지원

## 🎨 디자인 특징

- **무채색 디자인**: 심플하고 깔끔한 그레이 톤 컬러 팔레트
- **부드러운 애니메이션**: Framer Motion을 활용한 자연스러운 전환
- **한국어 폰트**: Apple SD Gothic Neo, Noto Sans KR 적용
- **접근성**: 키보드 내비게이션 및 스크린 리더 지원
- **스크롤 최적화**: 페이지 전환 시 자동 최상단 이동
- **모바일 최적화**: 터치 친화적 UI 및 이미지 캡쳐 개선

## 🚀 시작하기

### 설치 및 실행

```bash
# 프로젝트 클론
git clone https://github.com/thsuekfk2/workplace-personality-test.git
cd workplace-personality-test

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# http://localhost:3000 에서 확인
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 빌드된 앱 실행
npm start
```

## 🛠 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animation**: Framer Motion
- **Database**: Supabase (PostgreSQL)
- **Image Capture**: html-to-image
- **State Management**: React State + Supabase + Local Storage
- **OG Image Generation**: Next.js ImageResponse API
- **Code Formatting**: Prettier
- **Deployment**: Vercel 최적화

## 📱 페이지 구성

1. **시작 페이지**: 테스트 소개 및 시작 버튼
2. **안내 페이지**: 테스트 방법 및 주의사항
3. **테스트 페이지**: 10문항 질문 및 진행률 표시
4. **결과 페이지**: 유형 결과, 특징, 공유 기능
5. **모든 결과 페이지**: 전체 유형 정보 및 상세 설명
6. **동적 공유 페이지**: `/result/[type]` - 결과별 전용 공유 페이지

## 🎯 4가지 직장인 유형

| 유형                              | 특징                           | 추천 직무                    |
| --------------------------------- | ------------------------------ | ---------------------------- |
| 진취적이며 자신감 넘치는 행동대장 | 진취적, 자신감, 리더십, 추진력 | 팀장, 영업관리, 사업개발     |
| 낙천적으로 사교적인 배짱이        | 낙천적, 사교적, 긍정적, 활력   | 마케터, 영업, 이벤트 기획    |
| 솔직한 조언가                     | 솔직함, 객관적, 신뢰성, 분석적 | 컨설턴트, 멘토, 코치, 분석가 |
| 배려가 넘치는 따뜻한 평화주의자   | 배려심, 평화주의, 공감, 조화   | HR, 고객서비스, 복지, 상담   |

## 💡 주요 기능 상세

### 🎯 강화된 공유 시스템

- **동적 OG 이미지**: 각 유형별 맞춤 이미지 자동 생성 (`/api/og?type=[유형]`)
- **결과별 전용 URL**: `/result/[type]` 형태의 공유 전용 페이지
- **카카오톡 공유**: 카카오 SDK 연동으로 풍부한 미리보기
- **이미지 캡쳐**: html-to-image 라이브러리로 안정적인 결과 저장

### 📱 사용자 경험 개선

- **진행 상황 저장**: 페이지 새로고침해도 테스트 이어서 진행
- **결과 유지**: 마지막 테스트 결과 자동 저장
- **스크롤 최적화**: 페이지 전환 시 부드러운 최상단 이동
- **로딩 상태**: 각 작업별 명확한 피드백 메시지

### 🔧 기술적 특징

- **Edge Runtime**: OG 이미지 생성 최적화
- **정적 생성**: 메인 페이지들 사전 렌더링
- **동적 라우팅**: Next.js 15 async params 지원
- **타입 안전성**: 완전한 TypeScript 지원

## 📊 성능 최적화

- **번들 크기**: 약 161KB (First Load JS)
- **정적 생성**: 메인 페이지 정적 프리렌더링
- **동적 생성**: 공유 페이지 서버 렌더링
- **이미지 최적화**: 동적 OG 이미지 생성
- **폰트 최적화**: Google Fonts 프리로드

## 🔧 개발자 가이드

### 새로운 질문 추가

```typescript
// src/lib/data.ts에서 questions 배열에 추가
{
  id: 11,
  text: "새로운 질문",
  options: {
    a: "선택지 A",
    b: "선택지 B"
  },
  weights: {
    a: { extrovert: 3, introvert: 0, emotion: 1, thought: 2 },
    b: { extrovert: 0, introvert: 3, emotion: 2, thought: 1 }
  }
}
```

### 새로운 유형 추가

```typescript
// src/lib/data.ts에서 personalityTypes 배열에 추가
{
  id: 'new_type',
  type: 'aa',
  name: '새로운 유형명',
  description: '간단한 설명',
  traits: ['특징1', '특징2'],
  recommendedJobs: ['직무1', '직무2'],
  color: '#4a5568',
  character: 'new_character',
  detailedDescription: ['상세설명1', '상세설명2'],
  needs: ['필요한것1', '필요한것2'],
  whenDistorted: ['주의사항1', '주의사항2']
}
```

## 🌐 배포 가이드

### Vercel 배포

1. GitHub 저장소 연결
2. 자동 빌드 및 배포
3. 환경변수 설정 (선택사항):
   ```
   NEXT_PUBLIC_KAKAO_APP_KEY=your_kakao_javascript_app_key
   ```

### 기타 플랫폼

- **Netlify**: 정적 빌드 지원
- **GitHub Pages**: 정적 배포 가능
- **Docker**: 컨테이너 배포 지원

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 있습니다.

## 🤝 기여하기

버그 리포트, 기능 제안, 풀 리퀘스트를 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 업데이트 내역

### v3.0.0 (2025-07-09)

- 🎨 **무채색 디자인**: 심플하고 깔끔한 그레이 톤 테마 적용
- 📱 **모바일 이미지 캡쳐 개선**: 터치 디바이스에서 안정적인 이미지 저장
- 📊 **실시간 통계**: Supabase 기반 테스트 참여자 수 및 인기 유형 표시
- ⚡ **성능 최적화**: 이미지 로딩 및 CORS 설정 개선

### v2.0.0 (2025-07-06)

- 🎯 강화된 공유 시스템 구현
- 📸 html-to-image 기반 이미지 캡쳐
- 🔗 동적 OG 이미지 생성
- 📱 결과별 전용 공유 페이지
- 🚀 스크롤 최적화 및 UX 개선

### v1.0.0 (2025-07-05)

- 🏢 직장인 유형 테스트 초기 버전
- ✨ 4가지 유형 분류 시스템
- 💾 로컬 스토리지 진행 상황 저장
- 📱 반응형 디자인 구현

---

**GitHub**: [thsuekfk2/workplace-personality-test](https://github.com/thsuekfk2/workplace-personality-test)  
**버전**: 3.0.0  
**최종 업데이트**: 2025년 7월 9일
