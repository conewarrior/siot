# Development Guide: UX 디자인 포트폴리오 페이지

## Overview

UX 디자인 포트폴리오 전용 페이지(`/portfolio`)를 추가한다. therawmaterials.com을 참고한 좌측 색상 카드 내비게이션 + 우측 16:9 슬라이드 레이아웃으로 구성되며, PDF 다운로드 기능과 모바일 세로 스크롤 모드를 지원한다.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion (애니메이션)
- next-mdx-remote (MDX 콘텐츠)

## 섹션별 색상 팔레트

| 섹션 | 배경색 | 텍스트 |
|------|--------|--------|
| Cover | #FFFFFF (흰색) | #000000 |
| 프로젝트 1 | #F97316 (오렌지) | #FFFFFF |
| 프로젝트 2 | #7C3AED (보라) | #FFFFFF |
| 프로젝트 3 | #2563EB (파랑) | #FFFFFF |
| About | #EC4899 (핑크) | #FFFFFF |
| Epilogue | #FACC15 (노랑) | #000000 |

---

## Phase 1: 기본 구조 셋업

<!-- PARALLEL_START -->

### Task 1-A: 포트폴리오 라우트 및 레이아웃 생성
- **범위**: `src/app/portfolio/`
- **설명**:
  - `/portfolio` 라우트 생성
  - `page.tsx`: 메인 페이지 컴포넌트
  - `layout.tsx`: 포트폴리오 전용 레이아웃 (헤더 숨김 또는 최소화)
  - noindex 메타 태그 추가
- **완료 조건**:
  - [ ] `/portfolio` 접근 시 페이지 렌더링
  - [ ] `<meta name="robots" content="noindex, nofollow" />` 적용
- **복잡도**: S

### Task 1-B: 헤더 메뉴에 포트폴리오 링크 추가
- **범위**: `src/components/header.tsx`
- **설명**:
  - navItems 배열에 포트폴리오 메뉴 추가
  - 순서: 홈 | 블로그 | 프로젝트 | **포트폴리오** | 소개
- **완료 조건**:
  - [ ] 헤더에 포트폴리오 링크 표시
  - [ ] 활성 상태 스타일 적용
- **복잡도**: S

### Task 1-C: 슬라이드 컨테이너 컴포넌트
- **범위**: `src/components/portfolio/slide-container.tsx`
- **설명**:
  - 16:9 비율 유지하는 슬라이드 컨테이너
  - 보더로 감싸진 영역
  - 반응형: 화면 크기에 맞춰 비율 유지
- **완료 조건**:
  - [ ] 16:9 비율 유지
  - [ ] 보더 스타일 적용
  - [ ] 최대 너비 제한 (너무 커지지 않도록)
- **복잡도**: S

### Task 1-D: 좌측 내비게이션 컴포넌트
- **범위**: `src/components/portfolio/side-navigation.tsx`
- **설명**:
  - 색상 카드 스타일 내비게이션
  - 섹션 번호 (00, 01, 02...) 표시
  - 현재 섹션 하이라이트 (활성 인디케이터)
  - 호버 시 확대 효과
- **완료 조건**:
  - [ ] 색상 카드 렌더링
  - [ ] 섹션 번호 표시
  - [ ] 활성 상태 인디케이터
  - [ ] 호버 애니메이션
- **복잡도**: M

<!-- PARALLEL_END -->

---

## Phase 2: 슬라이드 내비게이션 시스템

<!-- PARALLEL_START -->

### Task 2-A: 슬라이드 상태 관리 훅
- **범위**: `src/hooks/use-portfolio-navigation.ts`
- **설명**:
  - 현재 섹션/슬라이드 인덱스 상태 관리
  - 이전/다음 슬라이드 이동 함수
  - 특정 섹션으로 점프 함수
  - 전체 슬라이드 수, 현재 위치 계산
- **완료 조건**:
  - [ ] 상태 관리 로직 구현
  - [ ] 경계 조건 처리 (첫/마지막 슬라이드)
- **복잡도**: M

### Task 2-B: 좌우 화살표 버튼 컴포넌트
- **범위**: `src/components/portfolio/navigation-arrows.tsx`
- **설명**:
  - 화면 양쪽에 배치되는 화살표 버튼
  - 첫/마지막 슬라이드에서 비활성화 표시
  - 호버 시 시각적 피드백
- **완료 조건**:
  - [ ] 좌우 화살표 렌더링
  - [ ] 클릭 시 슬라이드 이동
  - [ ] 경계에서 비활성화 스타일
- **복잡도**: S

### Task 2-C: 하단 페이지 인디케이터
- **범위**: `src/components/portfolio/page-indicator.tsx`
- **설명**:
  - 현재 위치 표시: "● 02 / 05" 형식
  - 섹션 내 슬라이드 진행도
  - 프로젝트명 라벨 표시
- **완료 조건**:
  - [ ] 현재/전체 페이지 표시
  - [ ] 프로젝트명 라벨
- **복잡도**: S

### Task 2-D: 키보드 내비게이션
- **범위**: `src/components/portfolio/keyboard-navigation.tsx`
- **설명**:
  - 좌우 화살표 키로 슬라이드 이동
  - useEffect로 이벤트 리스너 등록
  - 페이지 진입/이탈 시 정리
- **완료 조건**:
  - [ ] 좌우 화살표 키 동작
  - [ ] 이벤트 리스너 정리
- **복잡도**: S

<!-- PARALLEL_END -->

---

## Phase 3: 애니메이션 시스템

**의존성**: Phase 1, Phase 2 완료 필요

<!-- PARALLEL_START -->

### Task 3-A: 페이지 전환 애니메이션
- **범위**: `src/components/portfolio/slide-transition.tsx`
- **설명**:
  - Framer Motion AnimatePresence 활용
  - 슬라이드/페이드 전환 효과
  - 방향에 따른 전환 (좌→우, 우→좌)
- **완료 조건**:
  - [ ] 부드러운 전환 애니메이션
  - [ ] 방향별 다른 효과
- **복잡도**: M

### Task 3-B: 섹션 진입 알림
- **범위**: `src/components/portfolio/section-entry.tsx`
- **설명**:
  - "You are now entering (프로젝트명) section" 메시지
  - 섹션 전환 시 잠깐 표시 후 사라짐
  - 애니메이션으로 진입/퇴장
- **완료 조건**:
  - [ ] 섹션 전환 시 알림 표시
  - [ ] 자동 사라짐 (2초 후)
- **복잡도**: S

### Task 3-C: 요소 순차 애니메이션 래퍼
- **범위**: `src/components/portfolio/staggered-content.tsx`
- **설명**:
  - 슬라이드 내 요소들이 순차적으로 나타남
  - staggerChildren 패턴 적용
  - 텍스트, 이미지, 표 등에 적용 가능
- **완료 조건**:
  - [ ] 순차 애니메이션 동작
  - [ ] 재사용 가능한 래퍼 컴포넌트
- **복잡도**: S

<!-- PARALLEL_END -->

---

## Phase 4: MDX 콘텐츠 시스템

**의존성**: Phase 1 완료 필요

<!-- PARALLEL_START -->

### Task 4-A: 포트폴리오 MDX 파일 구조 설계
- **범위**: `docs/content/portfolio/`
- **설명**:
  - 폴더 구조 생성
  - 각 섹션별 MDX 파일 템플릿
  - Frontmatter 스키마 정의
- **완료 조건**:
  - [ ] 폴더 구조 생성
  - [ ] cover.mdx, about.mdx, epilogue.mdx 템플릿
  - [ ] project-1.mdx, project-2.mdx, project-3.mdx 템플릿
- **복잡도**: S

```
docs/content/portfolio/
├── cover.mdx
├── project-1-cro-analysis.mdx
├── project-2-design-system.mdx
├── project-3-xxx.mdx
├── about.mdx
└── epilogue.mdx
```

### Task 4-B: 포트폴리오 MDX 로더
- **범위**: `src/lib/portfolio-mdx.ts`
- **설명**:
  - 포트폴리오 MDX 파일 로드 함수
  - Frontmatter 파싱 (title, order, slides, color)
  - 슬라이드 순서 정렬
- **완료 조건**:
  - [ ] MDX 파일 로드 함수
  - [ ] Frontmatter 타입 정의
  - [ ] 섹션 순서대로 정렬
- **복잡도**: M

### Task 4-C: 슬라이드 타입별 템플릿 컴포넌트
- **범위**: `src/components/portfolio/slides/`
- **설명**:
  - `problem-slide.tsx`: 문제 정의 슬라이드
  - `process-slide.tsx`: 과정 슬라이드
  - `outcome-slide.tsx`: 결과/지표 슬라이드 (표 포함)
  - `reflection-slide.tsx`: 회고 슬라이드
  - `cover-slide.tsx`: 커버 슬라이드
- **완료 조건**:
  - [ ] 각 슬라이드 타입별 레이아웃
  - [ ] 일관된 스타일링
  - [ ] MDX 콘텐츠 렌더링
- **복잡도**: M

<!-- PARALLEL_END -->

---

## Phase 5: 통합 및 마무리

**의존성**: Phase 1-4 완료 필요

### Task 5-A: 컴포넌트 통합
- **범위**: `src/app/portfolio/page.tsx`
- **설명**:
  - 모든 컴포넌트 조합
  - 상태 연결 (내비게이션 ↔ 슬라이드 ↔ 인디케이터)
  - MDX 콘텐츠 렌더링
- **완료 조건**:
  - [ ] 전체 레이아웃 동작
  - [ ] 내비게이션 연동
  - [ ] 콘텐츠 표시
- **복잡도**: M

### Task 5-B: PDF 다운로드 기능
- **범위**: `src/components/portfolio/pdf-download.tsx`, `src/app/api/portfolio-pdf/route.ts`
- **설명**:
  - PDF 다운로드 버튼 컴포넌트
  - 방법 1: 브라우저 인쇄 기능 활용 (window.print)
  - 방법 2: 서버사이드 PDF 생성 (puppeteer 또는 react-pdf)
- **완료 조건**:
  - [ ] PDF 다운로드 버튼
  - [ ] PDF 생성 및 다운로드
- **복잡도**: L

### Task 5-C: 모바일 세로 스크롤 모드
- **범위**: `src/components/portfolio/mobile-layout.tsx`
- **설명**:
  - 반응형 브레이크포인트 (md: 768px)
  - 모바일에서 세로 스크롤로 전환
  - 좌측 메뉴 → 햄버거 메뉴
  - 슬라이드들이 세로로 쌓임
- **완료 조건**:
  - [ ] 모바일 레이아웃 전환
  - [ ] 햄버거 메뉴 동작
  - [ ] 세로 스크롤 모드
- **복잡도**: M

### Task 5-D: 성능 최적화 및 QA
- **범위**: 전체
- **설명**:
  - 이미지 최적화 (next/image)
  - 지연 로딩 적용
  - 라이트하우스 점수 확인
  - 브라우저 호환성 테스트
- **완료 조건**:
  - [ ] 성능 점수 확인
  - [ ] 주요 브라우저 테스트
- **복잡도**: S

---

## 필요 컴포넌트

### 신규 생성

| 컴포넌트 | 위치 | 설명 | Props |
|----------|------|------|-------|
| SlideContainer | `@/components/portfolio` | 16:9 슬라이드 컨테이너 | `children`, `className?` |
| SideNavigation | `@/components/portfolio` | 좌측 색상 카드 내비게이션 | `sections`, `currentIndex`, `onSelect` |
| NavigationArrows | `@/components/portfolio` | 좌우 화살표 버튼 | `onPrev`, `onNext`, `hasPrev`, `hasNext` |
| PageIndicator | `@/components/portfolio` | 페이지 인디케이터 | `current`, `total`, `sectionName` |
| KeyboardNavigation | `@/components/portfolio` | 키보드 이벤트 핸들러 | `onPrev`, `onNext` |
| SlideTransition | `@/components/portfolio` | 페이지 전환 애니메이션 | `children`, `direction` |
| SectionEntry | `@/components/portfolio` | 섹션 진입 알림 | `sectionName`, `isVisible` |
| StaggeredContent | `@/components/portfolio` | 순차 애니메이션 래퍼 | `children`, `delay?` |
| PdfDownload | `@/components/portfolio` | PDF 다운로드 버튼 | `className?` |
| MobileLayout | `@/components/portfolio` | 모바일 레이아웃 | `children`, `sections` |
| CoverSlide | `@/components/portfolio/slides` | 커버 슬라이드 | `title`, `subtitle`, `toc` |
| ProblemSlide | `@/components/portfolio/slides` | 문제 정의 슬라이드 | `content` |
| ProcessSlide | `@/components/portfolio/slides` | 과정 슬라이드 | `content` |
| OutcomeSlide | `@/components/portfolio/slides` | 결과/지표 슬라이드 | `content`, `metrics` |
| ReflectionSlide | `@/components/portfolio/slides` | 회고 슬라이드 | `content` |

### 기존 활용

| 컴포넌트 | 위치 | 용도 |
|----------|------|------|
| Header | `@/components/header` | 상단 헤더 (메뉴 추가) |
| AnimatedText | `@/components/animated-text` | 타이틀 애니메이션 |
| MDXContent | `@/components/mdx-content` | MDX 렌더링 |

---

## 파일 구조 요약

```
src/
├── app/
│   └── portfolio/
│       ├── page.tsx           # 메인 페이지
│       └── layout.tsx         # 포트폴리오 레이아웃
├── components/
│   └── portfolio/
│       ├── slide-container.tsx
│       ├── side-navigation.tsx
│       ├── navigation-arrows.tsx
│       ├── page-indicator.tsx
│       ├── keyboard-navigation.tsx
│       ├── slide-transition.tsx
│       ├── section-entry.tsx
│       ├── staggered-content.tsx
│       ├── pdf-download.tsx
│       ├── mobile-layout.tsx
│       └── slides/
│           ├── cover-slide.tsx
│           ├── problem-slide.tsx
│           ├── process-slide.tsx
│           ├── outcome-slide.tsx
│           └── reflection-slide.tsx
├── hooks/
│   └── use-portfolio-navigation.ts
└── lib/
    └── portfolio-mdx.ts

docs/content/portfolio/
├── cover.mdx
├── project-1-cro-analysis.mdx
├── project-2-design-system.mdx
├── project-3-xxx.mdx
├── about.mdx
└── epilogue.mdx
```

---

## 참고사항

### 코딩 스타일
- Tailwind CSS v4 사용 (config 파일 없음)
- Framer Motion 애니메이션 패턴 기존 코드 참고
- TypeScript strict mode
- 한국어 콘텐츠

### 디자인 참고
- **therawmaterials.com**: 색상 카드 내비게이션, 섹션 전환 메시지, 페이지 인디케이터
- **현재 사이트**: 오렌지 액센트, Pretendard 서체, 미니멀 스타일

### 라이트 모드 전용
- 포트폴리오 페이지는 라이트 모드만 지원 (PDF 출력 최적화)
- 다크모드 토글 숨김 또는 비활성화
