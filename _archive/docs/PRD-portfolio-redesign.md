# PRD: 포트폴리오 페이지 전면 리디자인

## 개요

UX 디자이너 포트폴리오 페이지의 디자인 완성도를 높이기 위한 전면 리뉴얼 프로젝트.
현재 "배보다 배꼽이 큰" 컴포넌트 남용, 중앙정렬 일변도의 단조로운 레이아웃, 불명확한 타이포그래피 계층 등의 문제를 해결한다.

## 핵심 문제점

### 1. 레이아웃
- **중앙정렬 남용**: 거의 모든 요소가 `text-center`, `items-center`, `justify-center`
- **여백/간격 불균형**: 요소 간 간격이 일관성 없이 `gap-2`, `gap-4`, `gap-6`, `gap-8` 등 혼재
- **시각적 계층 부재**: 중요도에 따른 강조/위계 없음
- **다채로움 부족**: 좌측정렬 + 그리드 활용 없이 단조로운 구성

### 2. 커버 슬라이드
- 가운데 정렬만 사용해 개성 없음
- 자기 소개 정보 누락 (이름, 직함, 연락처, 키워드, 한 줄 소개)
- 프로젝트 미리보기가 카드로 감싸져 있어 과함

### 3. 카드 컴포넌트 남용
- 정보가 한 줄인데도 카드로 감싸는 경우 다수
- `rounded-xl bg-secondary/50 border border-border` 패턴 과다 사용
- 정보량 대비 시각적 무게가 과함

### 4. 타이포그래피
- 사이즈 종류가 너무 많음: `text-xs`, `text-sm`, `text-base`, `text-xl`, `text-3xl`, `text-4xl`, `text-5xl`, `text-6xl` 등 무질서하게 사용
- 계층 구분 불명확: 제목/본문/캡션이 시각적으로 구분 안 됨
- 두께(weight) 사용 기준 없음

### 5. 이미지 잘림
- 슬라이드 내 이미지가 뷰포트에서 잘려서 보임
- 특히 라벨링 프로젝트 리서치 페이지에서 발생

## 해결 방향

### 구조
- **하이브리드**: 슬라이드 기반 유지하되 16:9 비율 강제하지 않음
- **PDF 변환 가능**: 프린트/PDF 출력 고려한 레이아웃
- **데스크톱 전용**: 반응형은 데스크톱만 (모바일은 현재 안내 모달 유지)

### 그리드 시스템
- **12컬럼 그리드** 도입
- 레이아웃 영역 구분: 4+8, 6+6, 3+9, 8+4 등 다양한 조합
- 좌측정렬 기본, 필요시에만 중앙정렬

### 색상
- **더 대담하게**: 포인트 컬러 강조
- 프로젝트별 테마 색상 적극 활용
- 배경/전경 대비 명확하게

## 타이포그래피 시스템 (5단계)

| 계층 | 용도 | 크기 | 두께 | 행간 |
|-----|------|------|------|------|
| **Hero** | 포트폴리오 커버 메인 타이틀 | `text-6xl` (60px) | `font-bold` (700) | `leading-tight` |
| **H1** | 프로젝트 제목, 섹션 대제목 | `text-4xl` (36px) | `font-bold` (700) | `leading-snug` |
| **H2** | 슬라이드 제목, 소제목 | `text-2xl` (24px) | `font-semibold` (600) | `leading-snug` |
| **Body** | 본문, 설명 텍스트 | `text-base` (16px) | `font-normal` (400) | `leading-relaxed` |
| **Caption** | 메타 정보, 부가 설명, 라벨 | `text-sm` (14px) | `font-medium` (500) | `leading-normal` |

### 적용 원칙
- 위 5단계 외 크기 사용 금지 (`text-xs`, `text-xl`, `text-3xl`, `text-5xl` 등 제거)
- 두께는 용도에 맞게 일관되게 사용
- 색상: Hero/H1/H2는 `text-foreground`, Body는 `text-foreground/80`, Caption은 `text-muted`

## 컴포넌트 정리 원칙

### 카드 사용 기준
- **사용 O**: 3개 이상의 정보 묶음, 클릭 가능한 요소, 시각적으로 분리해야 할 영역
- **사용 X**: 단일 정보, 텍스트만 있는 경우, 이미 컨테이너 안에 있는 경우

### 대안 표현
| 기존 | 변경 |
|-----|------|
| 메타 정보 카드 (회사, 기간, 역할) | 플랫 텍스트 + 구분자 |
| 프로젝트 미리보기 카드 | 그리드 텍스트 리스트 |
| 스킬 카드 4개 | 2컬럼 텍스트 그리드 |
| 연락처 카드 | 인라인 링크 |

## 슬라이드별 리디자인 상세

### 1. 포트폴리오 커버 (IntroSlide)

**현재 문제:**
- 중앙정렬 + 프로젝트 미리보기 카드 4개
- 소개 정보 부족

**변경:**
```
┌────────────────────────────────────────┐
│                                        │
│  [좌측 4컬럼]          [우측 8컬럼]      │
│  김한솔                                 │
│  Product Designer                       │
│  & Developer           인트로 텍스트     │
│                        (2-3줄)          │
│  ─────────────────                      │
│  Email                 프로젝트 목록     │
│  GitHub                (텍스트 리스트)   │
│  LinkedIn                               │
│                                        │
└────────────────────────────────────────┘
```

**포함 정보:**
- 이름 (Hero 타이포)
- 직함 (H2 타이포)
- 한 줄 소개문 (Body)
- 핵심 역량/키워드 (Caption)
- 연락처/링크 (Caption + 링크)
- 프로젝트 목록 (텍스트, 카드 X)

### 2. 프로젝트 커버 (CoverSlide)

**현재 문제:**
- 중앙정렬
- 메타 정보가 pill 형태 카드

**변경:**
```
┌────────────────────────────────────────┐
│                                        │
│  [상단 영역]                            │
│  프로젝트 번호 · 회사명 · 기간          │
│                                        │
│  [메인 영역 - 좌측 정렬]                 │
│  프로젝트 제목 (H1)                      │
│  역할 태그 (Caption)                    │
│                                        │
│  한 줄 개요 (Body)                      │
│                                        │
│  [하단 - 핵심 성과 수치 3개]             │
│  70% ↓        48% ↓        20% ↓       │
│  분석 시간    작업 시간    협업 시간     │
│                                        │
└────────────────────────────────────────┘
```

### 3. Problem 슬라이드

**현재 문제:**
- 배경 컨텍스트가 불릿 리스트로만 표현
- 다이어그램과 텍스트 배치 불균형

**변경:**
```
┌────────────────────────────────────────┐
│  PROBLEM (Caption, accent)              │
│                                        │
│  [좌측 6컬럼]          [우측 6컬럼]      │
│  배경 컨텍스트         다이어그램/       │
│  (Body 불릿 3개)       비즈니스 임팩트   │
│                                        │
│  → 숫자 강조형으로                       │
│    (예: "주당 8시간")                    │
│                                        │
└────────────────────────────────────────┘
```

### 4. Process 슬라이드

**현재 문제:**
- 접근 방식 텍스트와 다이어그램 구분 불명확
- 이미지가 잘리는 문제

**변경:**
```
┌────────────────────────────────────────┐
│  PROCESS: 리서치 (Caption, accent)      │
│                                        │
│  [상단 - 접근 방식 요약]                 │
│  • 포인트 1                             │
│  • 포인트 2                             │
│  • 포인트 3                             │
│                                        │
│  [하단 - 풀 너비 다이어그램/스크린샷]     │
│  ┌──────────────────────────────────┐  │
│  │     이미지 (object-contain)       │  │
│  │     잘리지 않게 전체 표시           │  │
│  └──────────────────────────────────┘  │
│                                        │
└────────────────────────────────────────┘
```

### 5. Outcome 슬라이드

**변경:**
```
┌────────────────────────────────────────┐
│  OUTCOME (Caption, accent)              │
│                                        │
│  [상단 - 핵심 성과 수치]                 │
│  ┌────────┐ ┌────────┐ ┌────────┐      │
│  │  70%   │ │ 120+   │ │ 실시간  │      │
│  │분석단축 │ │캠페인  │ │인사이트 │      │
│  └────────┘ └────────┘ └────────┘      │
│                                        │
│  [하단 - 차트/다이어그램]                │
│                                        │
│  [최하단 - 회고 (2컬럼, 카드 X)]         │
│  잘한 점          개선할 점              │
│  • ...           • ...                 │
│                                        │
└────────────────────────────────────────┘
```

### 6. Epilogue 슬라이드 (About + Contact 통합)

**현재 문제:**
- 스킬이 아이콘 + 카드 4개
- 연락처도 카드

**변경:**
```
┌────────────────────────────────────────┐
│                                        │
│  [좌측 5컬럼]          [우측 7컬럼]      │
│  ABOUT                                 │
│                                        │
│  김한솔                스킬 (2컬럼 텍스트)│
│  Product Designer     • UX 리서치       │
│  & Developer          • 디자인 시스템    │
│                       • 프론트엔드 개발  │
│  철학 (Body)           • Figma 고급 활용 │
│  ...                                   │
│                       ─────────────────│
│  ─────────────────                      │
│  Email · GitHub       Thank You        │
│                       새로운 프로젝트... │
│                                        │
└────────────────────────────────────────┘
```

## 이미지 처리

### 문제
- `object-cover`로 인해 이미지가 잘림
- 특히 스크린샷 갤러리에서 발생

### 해결
```tsx
// 변경 전
<img className="object-cover w-full h-full" />

// 변경 후
<img className="object-contain w-full h-auto max-h-[400px]" />
```

### 원칙
- 스크린샷은 **절대 잘리면 안 됨** → `object-contain`
- 배경 이미지만 `object-cover` 허용
- 이미지 컨테이너에 `max-h` 설정으로 과도한 크기 방지

## 기술 구현 사항

### 1. 12컬럼 그리드 유틸리티

```tsx
// components/portfolio/grid.tsx
interface GridProps {
  children: React.ReactNode;
  cols?: '4-8' | '6-6' | '5-7' | '8-4' | '3-9';
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end';
}

export function Grid({ children, cols = '6-6', gap = 'md', align = 'start' }: GridProps) {
  const colsClass = {
    '4-8': 'grid-cols-12 [&>*:first-child]:col-span-4 [&>*:last-child]:col-span-8',
    '6-6': 'grid-cols-12 [&>*:first-child]:col-span-6 [&>*:last-child]:col-span-6',
    '5-7': 'grid-cols-12 [&>*:first-child]:col-span-5 [&>*:last-child]:col-span-7',
    '8-4': 'grid-cols-12 [&>*:first-child]:col-span-8 [&>*:last-child]:col-span-4',
    '3-9': 'grid-cols-12 [&>*:first-child]:col-span-3 [&>*:last-child]:col-span-9',
  };
  // ...
}
```

### 2. 타이포그래피 컴포넌트

```tsx
// components/portfolio/typography.tsx
type TypoVariant = 'hero' | 'h1' | 'h2' | 'body' | 'caption';

const variantStyles: Record<TypoVariant, string> = {
  hero: 'text-6xl font-bold leading-tight text-foreground',
  h1: 'text-4xl font-bold leading-snug text-foreground',
  h2: 'text-2xl font-semibold leading-snug text-foreground',
  body: 'text-base font-normal leading-relaxed text-foreground/80',
  caption: 'text-sm font-medium leading-normal text-muted',
};

export function Text({ variant, children, className, as }: TextProps) {
  const Component = as || 'p';
  return <Component className={cn(variantStyles[variant], className)}>{children}</Component>;
}
```

### 3. 슬라이드 리팩토링 순서

1. `typography.tsx` - 타이포 시스템 컴포넌트 생성
2. `grid.tsx` - 12컬럼 그리드 컴포넌트 생성
3. `intro-slide.tsx` - 포트폴리오 커버 새로 작성
4. `cover-slide.tsx` - 프로젝트 커버 리디자인
5. `problem-slide.tsx` - 6:6 그리드 적용
6. `process-slide.tsx` - 이미지 잘림 수정 + 레이아웃 개선
7. `outcome-slide.tsx` - 회고 섹션 카드 제거
8. `epilogue-slide.tsx` - 5:7 그리드 적용, 카드 제거
9. `screenshot-gallery.tsx` - object-contain 적용

## 스코프

### 포함
- 전체 슬라이드 타입 리디자인 (7개)
- 타이포그래피 시스템 정립
- 12컬럼 그리드 시스템 도입
- 불필요한 카드 컴포넌트 제거
- 이미지 잘림 문제 해결
- 색상 시스템 강화

### 제외
- 모바일 반응형 (현재 안내 모달 유지)
- 애니메이션 변경 (현재 유지)
- MDX 콘텐츠 구조 변경
- API 변경

## 작업 목록

<!-- PARALLEL_START -->

### Task 1: 기반 시스템 구축
**담당 파일:**
- `portfolio/src/components/portfolio/typography.tsx` (신규)
- `portfolio/src/components/portfolio/grid.tsx` (신규)

**작업 내용:**
1. 5단계 타이포그래피 시스템 컴포넌트 생성
2. 12컬럼 그리드 유틸리티 컴포넌트 생성
3. 공통 스타일 상수 정의

---

### Task 2: 포트폴리오 커버 리디자인
**담당 파일:**
- `portfolio/src/components/portfolio/slides/intro-slide.tsx` (신규)
- `portfolio/src/app/portfolio/page.tsx` (intro-slide import 추가)

**작업 내용:**
1. 좌측 정렬 기반 새 인트로 슬라이드 생성
2. 이름, 직함, 소개, 연락처, 프로젝트 목록 배치
3. 카드 컴포넌트 제거, 플랫 텍스트로 표현

---

### Task 3: 프로젝트 커버 리디자인
**담당 파일:**
- `portfolio/src/components/portfolio/slides/cover-slide.tsx`

**작업 내용:**
1. 좌측 정렬 레이아웃으로 변경
2. 메타 정보 pill 카드 → 플랫 텍스트 + 구분자
3. 핵심 성과 수치 하단에 배치

---

### Task 4: Problem/Process 슬라이드 리디자인
**담당 파일:**
- `portfolio/src/components/portfolio/slides/problem-slide.tsx`
- `portfolio/src/components/portfolio/slides/process-slide.tsx`

**작업 내용:**
1. 6:6 그리드 레이아웃 적용
2. 텍스트-다이어그램 영역 분리
3. 이미지 object-contain 적용으로 잘림 방지

---

### Task 5: Outcome/Epilogue 슬라이드 리디자인
**담당 파일:**
- `portfolio/src/components/portfolio/slides/outcome-slide.tsx`
- `portfolio/src/components/portfolio/slides/epilogue-slide.tsx`

**작업 내용:**
1. 회고 섹션 카드 제거 → 2컬럼 텍스트
2. Epilogue 5:7 그리드 적용
3. 스킬/연락처 카드 제거 → 플랫 텍스트

---

### Task 6: 이미지 갤러리 수정
**담당 파일:**
- `portfolio/src/components/portfolio/slides/screenshot-gallery.tsx`

**작업 내용:**
1. object-cover → object-contain 변경
2. max-h 설정으로 과도한 크기 방지
3. 캡션 스타일 Caption 타이포 적용

<!-- PARALLEL_END -->

## 완료 기준

1. 모든 슬라이드가 좌측 정렬 또는 그리드 기반 레이아웃 사용
2. 타이포그래피 5단계 외 다른 크기 사용 없음
3. 정보량 1-2개인 곳에 카드 컴포넌트 없음
4. 모든 스크린샷 이미지가 잘리지 않고 전체 표시
5. 포인트 컬러가 기존보다 눈에 띄게 강조

## 레퍼런스

- [AI 시대 UX/UI 디자이너 포트폴리오](https://yozm.wishket.com/magazine/detail/3132/)
  - 속도감 있는 디자인 프로세스
  - 솔루션 중심 결과물
  - 성과의 스토리텔링
