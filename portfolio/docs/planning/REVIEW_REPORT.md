# Code Review Report

## Summary
- 검토 파일 수: 12개
- 발견된 이슈: 8개 (Critical: 2, Warning: 4, Info: 2)
- 자동 수정: 6건

---

## Critical Issues

### 1. 중복 `<main>` 태그 (수정 완료)
**파일**: `layout.tsx`, `page.tsx`

layout.tsx에서 `<main>`으로 children을 감싸고, page.tsx에서도 `<main>`을 사용하여 HTML 시맨틱 오류 발생.

**수정 내용**: layout.tsx의 `<main>`을 `<div>`로 변경

### 2. 중복 `<section>` 태그 (수정 완료)
**파일**: 슬라이드 컴포넌트 5개

page.tsx에서 각 슬라이드를 `<section>`으로 감싸고, 슬라이드 컴포넌트 내부에서도 `<section>`을 사용하여 중첩 발생.

**수정 내용**: 슬라이드 컴포넌트들의 루트 요소를 `<section>`에서 `<div>`로 변경

---

## Improvements Made

### 1. ESLint 오류 수정
| 파일 | 이슈 | 수정 |
|------|------|------|
| `reflection-slide.tsx` | `"` 이스케이프 필요 | `&ldquo;`로 변경 |

### 2. 레이아웃 최적화
| 파일 | Before | After |
|------|--------|-------|
| 슬라이드 컴포넌트 | `min-h-screen snap-start` | `h-full` |

**이유**: 부모 section에서 이미 `h-screen snap-start`를 지정하므로, 자식에서 중복 설정 불필요

### 3. 접근성 개선
| 파일 | 추가된 속성 |
|------|-------------|
| `page.tsx` main | `role="main"`, `aria-label="포트폴리오 슬라이드"` |
| `page.tsx` section | `aria-label` (섹션명 + 슬라이드 제목) |

### 4. SSR 하이드레이션 개선
**파일**: `mobile-layout.tsx`

`useMediaQuery` 훅에서 effect 내 즉시 setState 호출이 린트 경고 발생. 초기값 계산 로직을 별도 함수로 분리하여 수정.

---

## Suggestions (수동 검토 권장)

### 1. 키보드 네비게이션 부재
스크롤 기반 구현으로 전환하면서 키보드 네비게이션이 제거됨. 접근성을 위해 다음 추가 권장:
- 화살표 키로 슬라이드 이동
- Tab/Shift+Tab으로 포커스 이동

```tsx
// 예시: page.tsx에 추가
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') goToNextSection();
    if (e.key === 'ArrowUp') goToPrevSection();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

### 2. PDF 다운로드 기능 미구현
`PageIndicator`에 `onDownloadPDF` prop이 있지만 page.tsx에서 전달하지 않음.

### 3. 스크롤 진행률 미사용
`sectionProgress`가 SideNavigation에 전달되지 않아 카드 높이 애니메이션이 동작하지 않음.

### 4. 린트 경고 (포트폴리오 외부)
다음 파일들에 린트 오류가 있으나 이번 리뷰 범위 외:
- `background-beams.tsx`: Math.random() 렌더링 중 호출
- `project-showcase.tsx`: ref 렌더링 중 접근

---

## Metrics

| 항목 | 값 |
|------|-----|
| 검토 코드 라인 | 1,406 lines |
| 수정된 파일 | 8개 |
| 중복 제거 | section/main 태그 중첩 해소 |
| 접근성 개선 | ARIA 속성 4개 추가 |

---

## Files Modified

```
src/app/portfolio/
  layout.tsx          # main -> div 변경
  page.tsx            # ARIA 속성 추가

src/components/portfolio/
  mobile-layout.tsx   # useMediaQuery SSR 개선
  slides/
    cover-slide.tsx       # section -> div, min-h-screen -> h-full
    problem-slide.tsx     # section -> div, min-h-screen -> h-full
    process-slide.tsx     # section -> div, min-h-screen -> h-full
    outcome-slide.tsx     # section -> div, min-h-screen -> h-full
    reflection-slide.tsx  # section -> div, min-h-screen -> h-full, 인용부호 이스케이프
```

---

*Generated: 2025-01-13*
