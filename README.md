# WellMeet - B2C 레스토랑 추천 앱

AI 기반 개인화 레스토랑 추천 서비스입니다. 사용자의 취향과 상황에 맞는 최적의 레스토랑을 추천하고, 예약 서비스를 제공합니다.

## 🚀 주요 기능

- **AI 기반 추천**: 개인화된 레스토랑 추천
- **실시간 채팅**: AI 컨시어지와의 실시간 상담
- **예약 관리**: 레스토랑 예약 및 관리
- **리뷰 시스템**: 상세한 리뷰 및 평점
- **알림 서비스**: 예약 확인 및 리마인더
- **프로필 관리**: 사용자 정보 및 설정

## 🛠 기술 스택

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **State Management**: React Hooks

## 📦 설치 및 실행

### 1. 의존성 설치

```bash
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 3. 빌드

```bash
npm run build
```

### 4. 빌드 결과 미리보기

```bash
npm run preview
```

## 📁 프로젝트 구조

```
├── src/
│   └── main.tsx          # 앱 진입점
├── components/           # React 컴포넌트
│   ├── ui/              # 재사용 가능한 UI 컴포넌트
│   ├── Home.tsx         # 홈 페이지
│   ├── ChatPage.tsx     # AI 채팅 페이지
│   ├── RestaurantDetail.tsx # 레스토랑 상세 페이지
│   └── ...
├── styles/
│   └── globals.css      # 전역 스타일
├── App.tsx              # 메인 앱 컴포넌트
├── package.json         # 프로젝트 설정
├── vite.config.ts       # Vite 설정
├── tailwind.config.js   # Tailwind CSS 설정
└── tsconfig.json        # TypeScript 설정
```

## 🎨 디자인 시스템

이 프로젝트는 모던한 디자인 시스템을 사용합니다:

- **컬러 팔레트**: CSS 변수를 통한 테마 시스템
- **타이포그래피**: 일관된 폰트 크기와 가중치
- **컴포넌트**: 재사용 가능한 UI 컴포넌트
- **반응형**: 모바일 우선 디자인

## 🔧 개발 가이드

### 코드 스타일

- ESLint를 사용한 코드 품질 관리
- TypeScript strict 모드 활성화
- Prettier를 통한 코드 포맷팅

### 컴포넌트 작성 규칙

1. 함수형 컴포넌트 사용
2. TypeScript 인터페이스 정의
3. Props 타입 명시
4. 재사용 가능한 컴포넌트는 `components/ui/`에 배치

### 스타일링

- Tailwind CSS 클래스 우선 사용
- CSS 변수를 통한 테마 관리
- 모바일 우선 반응형 디자인

## 📱 모바일 최적화

이 앱은 모바일 환경에 최적화되어 있습니다:

- 터치 친화적 UI
- 모바일 네비게이션
- 반응형 레이아웃
- PWA 지원 준비

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 📞 문의

프로젝트에 대한 문의사항이 있으시면 이슈를 생성해 주세요. 
