# Development Guide - 포트폴리오 페이지 v2 (스크롤 기반)

## Overview

기존 캐러셀 기반 포트폴리오 페이지를 스크롤 스냅 기반으로 전면 재구성한다.

**핵심 변경사항**:
- 캐러셀 → 세로 스크롤 + 스냅 (100vh 단위)
- 좌측 네비게이션: 스크롤 진행률에 따라 카드 확장
- 페이지 인디케이터: 프로그레스 바 형태
- 기존 사이트 헤더 표시 (layout 변경)
- 모바일: 좌측 네비 숨김

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion + CSS scroll-snap
- **State**: React hooks (useState, useEffect, Intersection Observer)

## 삭제 대상 파일

```
src/components/portfolio/navigation-arrows.tsx
src/components/portfolio/keyboard-navigation.tsx
src/components/portfolio/slide-transition.tsx
src/components/portfolio/section-entry.tsx
src/hooks/use-portfolio-navigation.ts
```

## 수정 대상 파일

```
src/app/portfolio/layout.tsx          # 헤더 연동
src/app/portfolio/page.tsx            # 스크롤 기반 전면 재작성
src/components/portfolio/side-navigation.tsx    # 스크롤 진행률 연동 + 카드 확장
src/components/portfolio/page-indicator.tsx     # 프로그레스 바로 변경
src/components/portfolio/staggered-content.tsx  # Intersection Observer 적용
src/components/portfolio/slides/*               # 100vh 레이아웃 적용
```

---

## Phase 1: 기존 코드 정리

<!-- PARALLEL_START -->

### Task 1-A: 캐러셀 관련 컴포넌트 삭제
**담당 파일**:
- `src/components/portfolio/navigation-arrows.tsx` (삭제)
- `src/components/portfolio/keyboard-navigation.tsx` (삭제)
- `src/components/portfolio/slide-transition.tsx` (삭제)
- `src/components/portfolio/section-entry.tsx` (삭제)

**설명**: 캐러셀 방식에서 사용하던 네비게이션 화살표, 키보드 이벤트 핸들러, 슬라이드 전환 애니메이션, 섹션 진입 알림 컴포넌트를 삭제한다.

**완료 조건**:
- [ ] 4개 파일 삭제 완료
- [ ] 다른 파일에서 import 참조 없음 확인

**복잡도**: S

---

### Task 1-B: 네비게이션 훅 삭제
**담당 파일**:
- `src/hooks/use-portfolio-navigation.ts` (삭제)

**설명**: 캐러셀 방식의 슬라이드 이동 로직을 담당하던 커스텀 훅을 삭제한다.

**완료 조건**:
- [ ] 파일 삭제 완료
- [ ] 다른 파일에서 import 참조 없음 확인

**복잡도**: S

<!-- PARALLEL_END -->

---

## Phase 2: 레이아웃 및 스크롤 컨테이너 구축

<!-- PARALLEL_START -->

### Task 2-A: 포트폴리오 레이아웃 수정 (헤더 연동)
**담당 파일**:
- `src/app/portfolio/layout.tsx`

**설명**: 기존 사이트 헤더를 포트폴리오 페이지에서도 표시하도록 수정한다. 기존 ThemeProvider 래핑은 유지하고 Header 컴포넌트를 import하여 추가한다.

**구현 내용**:
```tsx
import { Header } from "@/components/header";

// layout 안에 Header 추가
<Header />
<div className="flex-1 overflow-hidden">
  {children}
</div>
```

**완료 조건**:
- [ ] Header 컴포넌트 import 및 렌더링
- [ ] 라이트 테마 강제 유지
- [ ] robots noindex 유지
- [ ] 헤더 아래 콘텐츠 영역이 올바르게 배치됨

**복잡도**: S

---

### Task 2-B: 슬라이드 컴포넌트 100vh 레이아웃 적용
**담당 파일**:
- `src/components/portfolio/slides/cover-slide.tsx`
- `src/components/portfolio/slides/problem-slide.tsx`
- `src/components/portfolio/slides/process-slide.tsx`
- `src/components/portfolio/slides/outcome-slide.tsx`
- `src/components/portfolio/slides/reflection-slide.tsx`

**설명**: 각 슬라이드 컴포넌트가 100vh 높이를 차지하고 scroll-snap-align: start를 적용받을 수 있도록 수정한다.

**구현 내용**:
```tsx
// 각 슬라이드의 루트 요소에 적용
<section
  className="min-h-screen flex items-center justify-center snap-start"
  style={{ backgroundColor: sectionColor }}
>
  {/* 콘텐츠 */}
</section>
```

**완료 조건**:
- [ ] 모든 슬라이드가 min-h-screen 적용
- [ ] snap-start 클래스 적용
- [ ] 섹션별 배경색 props로 전달받아 적용
- [ ] 콘텐츠 중앙 정렬 유지

**복잡도**: M

<!-- PARALLEL_END -->

---

## Phase 3: 스크롤 스냅 메인 페이지 구현

### Task 3-A: page.tsx 스크롤 기반 재작성
**담당 파일**:
- `src/app/portfolio/page.tsx`

**의존성**: Task 1-A, 1-B 완료 후

**설명**: 기존 캐러셀 로직을 제거하고 스크롤 스냅 기반으로 전면 재작성한다.

**구현 내용**:
```tsx
// 메인 컨테이너
<main
  className="h-screen overflow-y-scroll snap-y snap-mandatory"
  ref={containerRef}
>
  {sections.map(section => (
    section.slides.map(slide => (
      <SlideComponent
        key={slideId}
        sectionColor={section.color}
        // ...
      />
    ))
  ))}
</main>
```

**핵심 변경**:
1. `scroll-snap-type: y mandatory` 적용
2. 기존 SlideTransition 제거 (CSS 스크롤로 대체)
3. KeyboardNavigation, NavigationArrows 제거
4. SectionEntry 제거
5. Intersection Observer로 현재 섹션 감지
6. 스크롤 이벤트로 진행률 계산

**완료 조건**:
- [ ] 스크롤 스냅이 정상 동작
- [ ] 각 슬라이드가 100vh 단위로 스냅
- [ ] 삭제된 컴포넌트 import 모두 제거
- [ ] 현재 섹션 인덱스 상태 관리 (Intersection Observer)
- [ ] 전체 스크롤 진행률 계산

**복잡도**: L

---

## Phase 4: 좌측 네비게이션 수정

### Task 4-A: side-navigation 스크롤 연동
**담당 파일**:
- `src/components/portfolio/side-navigation.tsx`

**의존성**: Task 3-A 완료 후 (진행률 데이터 필요)

**설명**: 기존 클릭 기반 네비게이션을 스크롤 진행률 반영 방식으로 수정한다. 현재 섹션 카드가 진행률에 따라 세로로 확장되는 애니메이션을 추가한다.

**Props 변경**:
```tsx
interface SideNavigationProps {
  sections: Section[];
  currentIndex: number;
  sectionProgress: number; // 0-1, 현재 섹션 내 진행률 (신규)
  onSelect: (index: number) => void;
}
```

**구현 내용**:
1. 현재 섹션 카드 높이 확장 (기본 40px → 진행률에 따라 최대 80px)
2. Framer Motion spring 애니메이션 적용
3. 클릭 시 `scrollIntoView({ behavior: 'smooth' })` 호출
4. 모바일에서는 `hidden md:block`으로 숨김

**완료 조건**:
- [ ] 현재 섹션 카드가 진행률에 따라 확장
- [ ] 확장 애니메이션이 부드러움 (spring)
- [ ] 클릭 시 해당 섹션으로 smooth scroll
- [ ] 모바일에서 숨김 처리

**복잡도**: M

---

## Phase 5: 페이지 인디케이터 및 진입 애니메이션

<!-- PARALLEL_START -->

### Task 5-A: page-indicator 프로그레스 바로 변경
**담당 파일**:
- `src/components/portfolio/page-indicator.tsx`

**설명**: 기존 "01 / 05" 형식을 프로그레스 바 형태로 변경한다. 전체 페이지 스크롤 진행률을 시각적으로 표시하고, PDF 다운로드 버튼을 우측에 배치한다.

**구현 내용**:
```tsx
interface PageIndicatorProps {
  progress: number; // 0-1, 전체 진행률
  onDownloadPDF?: () => void;
}

// UI: 하단 고정, 프로그레스 바 + PDF 버튼
<div className="fixed bottom-0 left-0 right-0 z-50 px-4 py-3 bg-background/80 backdrop-blur">
  <div className="flex items-center gap-4">
    {/* 프로그레스 바 */}
    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
      <div
        className="h-full bg-accent transition-all duration-150"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
    {/* PDF 다운로드 버튼 */}
    <button>PDF 다운로드</button>
  </div>
</div>
```

**완료 조건**:
- [ ] 프로그레스 바 UI 구현
- [ ] 진행률에 따라 바 길이 변경
- [ ] PDF 다운로드 버튼 우측 배치
- [ ] 하단 고정 (position: fixed)
- [ ] 배경 블러 효과

**복잡도**: S

---

### Task 5-B: staggered-content Intersection Observer 적용
**담당 파일**:
- `src/components/portfolio/staggered-content.tsx`

**설명**: 기존 슬라이드 전환 시마다 실행되던 애니메이션을 Intersection Observer 기반으로 변경한다. 뷰포트에 처음 진입할 때만 애니메이션이 실행되고, 이후에는 즉시 표시된다.

**구현 내용**:
```tsx
// Intersection Observer 사용
const [hasAnimated, setHasAnimated] = useState(false);
const ref = useRef<HTMLDivElement>(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    },
    { threshold: 0.3 }
  );
  // ...
}, []);

// hasAnimated에 따라 initial/animate 상태 결정
<motion.div
  initial={hasAnimated ? "visible" : "hidden"}
  animate="visible"
  // ...
>
```

**완료 조건**:
- [ ] Intersection Observer 적용
- [ ] 첫 진입 시에만 애니메이션 실행
- [ ] 애니메이션 완료 후 재진입 시 즉시 표시
- [ ] threshold 0.3 (30% 보이면 트리거)

**복잡도**: M

<!-- PARALLEL_END -->

---

## Phase 6: 마무리 및 통합

### Task 6-A: 전체 통합 및 테스트
**담당 파일**:
- `src/app/portfolio/page.tsx` (최종 조정)
- `src/app/portfolio/layout.tsx` (스타일 조정)

**의존성**: 모든 이전 Task 완료 후

**설명**: 모든 컴포넌트가 올바르게 연동되는지 확인하고, 반응형 레이아웃 및 성능을 테스트한다.

**테스트 항목**:
1. **데스크톱**
   - [ ] 스크롤 스냅 동작
   - [ ] 좌측 네비게이션 카드 확장
   - [ ] 프로그레스 바 진행률 표시
   - [ ] 슬라이드 진입 애니메이션
   - [ ] 헤더 표시 및 네비게이션

2. **모바일**
   - [ ] 좌측 네비게이션 숨김
   - [ ] 스크롤 스냅 동작
   - [ ] 프로그레스 바 표시
   - [ ] 터치 스크롤 부드러움

3. **성능**
   - [ ] 스크롤 시 60fps 유지
   - [ ] 불필요한 리렌더링 없음
   - [ ] Intersection Observer 정리 (cleanup)

**복잡도**: M

---

## 참고: 스크롤 스냅 CSS 스펙

```css
/* 컨테이너 */
.portfolio-container {
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  height: 100vh; /* 또는 calc(100vh - header-height) */
}

/* 각 슬라이드 */
.slide {
  scroll-snap-align: start;
  min-height: 100vh;
}
```

## 참고: Intersection Observer 패턴

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // 현재 보이는 슬라이드 처리
        }
      });
    },
    {
      root: containerRef.current,
      threshold: 0.5 // 50% 보이면 활성화
    }
  );

  slideRefs.current.forEach(ref => {
    if (ref) observer.observe(ref);
  });

  return () => observer.disconnect();
}, []);
```

---

## Task 요약

| Phase | Task | 파일 범위 | 복잡도 | 병렬 가능 |
|-------|------|-----------|--------|-----------|
| 1 | 1-A: 캐러셀 컴포넌트 삭제 | navigation-arrows, keyboard-navigation, slide-transition, section-entry | S | O |
| 1 | 1-B: 네비게이션 훅 삭제 | use-portfolio-navigation.ts | S | O |
| 2 | 2-A: 레이아웃 수정 | layout.tsx | S | O |
| 2 | 2-B: 슬라이드 100vh 적용 | slides/* | M | O |
| 3 | 3-A: page.tsx 재작성 | page.tsx | L | X (1,2 의존) |
| 4 | 4-A: side-navigation 수정 | side-navigation.tsx | M | X (3 의존) |
| 5 | 5-A: page-indicator 수정 | page-indicator.tsx | S | O |
| 5 | 5-B: staggered-content 수정 | staggered-content.tsx | M | O |
| 6 | 6-A: 통합 테스트 | page.tsx, layout.tsx | M | X (전체 의존) |
