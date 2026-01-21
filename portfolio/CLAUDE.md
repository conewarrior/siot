# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start development server (localhost:3000)
npm run build            # Production build
npm run start            # Start production server
npm run lint             # Run ESLint
npm run upload-images    # Upload local images to GitHub + jsDelivr CDN
npm run upload-images:dry  # Preview image uploads without executing
```

Working directory is `portfolio/`. Run `npm install` before first use.

## Architecture

This is a Next.js 16 portfolio site using App Router with TypeScript and Tailwind CSS v4.

### Tech Stack
- **Next.js 16** with App Router (React 19)
- **Tailwind CSS v4** (uses `@tailwindcss/postcss`, no config file)
- **Framer Motion** for animations
- **next-themes** for dark mode (class-based switching)
- **next-mdx-remote** for MDX content
- **TypeScript** with strict mode
- **Font**: Pretendard (via CDN in layout.tsx)

### Project Structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Home (Hero + Recent Posts + Projects)
│   ├── layout.tsx         # Root layout with BackgroundBeamsWithCollision
│   ├── globals.css        # Theme variables + Portfolio green palette
│   ├── blog/
│   │   ├── page.tsx       # Blog list (reads from docs/content/blog/)
│   │   └── [slug]/page.tsx # Blog post (MDX rendered)
│   ├── projects/page.tsx  # Projects gallery
│   └── about/page.tsx     # About page
├── components/
│   ├── animated-text.tsx  # Letter-by-letter animation + underline
│   ├── background-beams.tsx # Rain/beam collision effect (wraps entire site)
│   ├── hero-section.tsx   # Hero with Typewriter animation
│   ├── mdx-content.tsx    # MDX renderer with styled components
│   ├── text-rotate.tsx    # Rotating text with staggered character animation
│   ├── project-showcase.tsx # Project list with mouse-following image preview (홈페이지용)
│   ├── side-project-list.tsx # Side project list with floating image hover
│   ├── header.tsx         # Navigation with TextRotate logo
│   ├── typewriter.tsx     # Typing/deleting text animation
│   ├── theme-toggle.tsx   # Dark/light mode toggle
│   ├── blog-list.tsx      # Blog list with filter chips
│   └── toolkit-grid.tsx   # Toolkit grid with type filter (command/skill/agent)
└── lib/
    ├── utils.ts           # cn() helper (clsx + tailwind-merge)
    ├── mdx.ts             # MDX utilities (getBlogPosts, getProjects, etc.)
    └── toolkit-data.ts    # Toolkit items data (commands, skills, agents)

docs/
├── content/               # All site content (MDX files)
│   ├── blog/             # Blog posts
│   ├── projects/         # Project descriptions
│   └── about.mdx         # About page content
└── planning/
    └── roadmap.md        # Development roadmap
```

### Content Management

Content is managed via MDX files in `docs/content/`. To add/edit content:

1. **Blog posts**: Create/edit `docs/content/blog/[slug].mdx`
2. **Projects**: Create/edit `docs/content/projects/[slug].mdx`
3. **About**: Edit `docs/content/about.mdx`

Frontmatter for blog posts:
```yaml
title: "제목"
description: "설명"
date: "2025-12-28"
category: "디자인" | "개발"
published: true
```

**Side Projects & Toolkit**: 하드코딩으로 관리
- Side projects: `src/components/side-project-list.tsx`의 `projects` 배열
- Toolkit items: `src/lib/toolkit-data.ts`의 `toolkitItems` 배열

Blog posts are pre-rendered at build time via `generateStaticParams()` in `[slug]/page.tsx`.

### Animation Patterns

**TextRotate** (Header logo):
- Used in header for "hansol makes it [pop/snappy/flow/...]"
- Wrapped in `LayoutGroup` + `motion.span` for smooth width transitions
- Spring animation: `damping: 20, stiffness: 400`

**Typewriter** (Hero section):
- Typing/deleting animation for Korean phrases
- Props: `speed`, `deleteSpeed`, `waitTime`, `loop`, `cursorChar`

**AnimatedText** (Page titles):
- Letter-by-letter staggered entrance animation
- Synced underline that appears after last letter
- Props: `duration`, `delay`, `underlineHeight`, `underlineOffset`

**Floating Image** (Side projects, Project showcase):
- Mouse-following image preview using lerp (linear interpolation)
- `requestAnimationFrame` for smooth 60fps animation
- Fixed positioning with `translate3d()` for GPU acceleration
- Smooth opacity/scale transitions on hover enter/leave

**Hover underline** (List items):
- Scale-x transform pattern on parent element:
  ```
  relative after:absolute after:bg-accent after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300
  ```

### UI Patterns

**Filter Chips** (Blog, Toolkit):
- 각 필터에 `activeClass`와 `inactiveClass` 정의
- 색상별 테마: 전체(neutral), 카테고리별(blue, violet, emerald 등)
- 참고 파일: `blog-list.tsx`, `toolkit-grid.tsx`

```tsx
const filters = [
  {
    label: "전체",
    value: "all",
    activeClass: "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900",
    inactiveClass: "border-neutral-300 text-neutral-500 hover:border-neutral-400"
  },
  // ...카테고리별 필터
]
```

### Design Guide (Portfolio)

**필독**: 포트폴리오 페이지 작업 시 반드시 `docs/design-guide.md` 참조

**녹색 팔레트 (Portfolio Green Palette)**:
| Token | HEX | Name | Usage |
|-------|-----|------|-------|
| `--portfolio-primary` | #327039 | Forest Fern | 메인 브랜드, 활성 탭, CTA |
| `--portfolio-primary-dark` | #133020 | Tilled Earth | 텍스트, 다크 영역 |
| `--portfolio-bg` | #F8EDD9 | Alabaster Hay | 배경 |
| `--portfolio-accent` | #F0BE49 | Wheat Field Sunrise | 하이라이트 |
| `--portfolio-accent-warm` | #DD5C36 | Cherry Grove | 포인트 (제한적) |

**색상 원칙**:
- 프로젝트별 다른 색상 사용 금지 → 녹색 베리에이션으로 통일
- 액센트(골드, 코랄)는 매우 제한적으로
- `--green-100` ~ `--green-800` 스케일 활용

### Theming & Styling

**Dark Mode**:
- Uses `next-themes` with class-based switching (`.dark` class on html)
- `ThemeProvider` wraps the app in `layout.tsx`
- `ThemeToggle` component toggles between light/dark
- CSS variables defined in `globals.css` for `:root` (light) and `.dark`

**Colors (Site-wide)**:
- Accent: orange (#F97316 light, #FB923C dark)
- Colors via `@theme inline`: `text-foreground`, `text-muted`, `bg-secondary`, `bg-accent`
- Path alias: `@/*` maps to `./src/*`

**Tailwind v4 주의사항**:
- CSS 변수 색상(`bg-foreground`, `text-background`)이 **동적 클래스 문자열에서 작동 안 함**
- 해결: 명시적 Tailwind 색상 사용 (`bg-neutral-900`, `text-white` 등)
```tsx
// ❌ 작동 안 함
activeClass: "bg-foreground text-background"

// ✅ 작동함
activeClass: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900"
```

**Tailwind v4 토큰 등록 패턴**:
```css
@import "tailwindcss";

/* @theme inline으로 CSS 변수를 Tailwind 유틸리티로 등록 */
@theme inline {
  /* initial = 실제 값은 :root에서 정의, Tailwind가 변수 존재만 인식 */
  --color-background: initial;
  --color-foreground: initial;
  --color-accent: initial;
}

:root {
  --color-background: #ffffff;
  --color-foreground: #0a0a0a;
  --color-accent: #F97316;
}
```
- `initial` 키워드: 변수 이름만 등록, 실제 값은 `:root`에서
- Tailwind 유틸리티 충돌 시 `@layer utilities`에서 `!important`로 오버라이드

**Navigation Animation**:
- Uses Framer Motion `layoutId="nav-bubble"` for smooth active indicator
- `mix-blend-difference` creates the visual effect

### Korean Content

Site content is in Korean. See `docs/planning/roadmap.md` for development status.

## Blog Writing

Use the `/blog-writer` skill for writing blog posts. Key rules:
- **Location**: `docs/content/blog/[slug].mdx`
- **Tone**: 평서체 (plain form, no honorifics: "~했다" O, "~했습니다" X)
- **Structure**: Problem → Before → Journey → After → Takeaway
- **Slug**: English kebab-case (e.g., `github-api-claude-commands.mdx`)

## Image CDN

The `upload-images` script uploads local images referenced in MDX to GitHub and converts URLs to jsDelivr CDN:
- Images stored in `images` branch (separate from `main`)
- CDN URL format: `https://cdn.jsdelivr.net/gh/conewarrior/siot@images/uploads/[filename]`
- Requires `GITHUB_TOKEN` environment variable

## Deployment

Deployed on Vercel at https://portfolio-six-azure-69.vercel.app

## Portfolio Page (v3 - 뷰포트 제약 레이아웃)

포트폴리오 슬라이드 뷰어 (`/portfolio` 라우트)는 페이지 스크롤 없이 뷰포트 내에 모든 요소를 배치하는 프레젠테이션 페이지.

### v3 변경사항 (2025-01)

**뷰포트 제약 레이아웃:**
- 페이지 스크롤 제거 (`h-screen overflow-hidden`)
- 사이드 네비게이션 + 캔버스를 `calc(100vh-140px)` 높이로 제한
- 활성 섹션 카드 flex-grow 확장 (비활성 1 : 활성 2.5 비율)
- 슬라이드 인디케이터: 활성 카드 우측에 세로 바로 표시

### Route Structure
```
src/app/portfolio/
├── layout.tsx          # 헤더 포함, 라이트 테마 강제, robots noindex
├── page.tsx            # 뷰포트 제약 레이아웃 + Intersection Observer
src/api/portfolio/
└── route.ts            # 섹션 데이터 API
```

### Component Architecture
```
src/components/portfolio/
├── typography.tsx          # 타이포그래피 시스템 (Hero, H1, H2, Body, Caption)
├── grid.tsx                # 12컬럼 그리드 시스템 (Grid, GridItem)
├── side-navigation.tsx     # 좌측 섹션 네비게이션 (flex-grow 카드 + 슬라이드 인디케이터)
├── portfolio-menu-bar.tsx  # 상단 메뉴바 (섹션 색상 + 슬라이드 진행률)
└── slides/                 # 슬라이드 타입별 템플릿
    ├── intro-slide.tsx         # 포트폴리오 커버 (4-8 그리드, 좌측 정렬)
    ├── cover-slide.tsx         # 프로젝트 커버 (좌측 정렬, 성과 수치)
    ├── problem-slide.tsx       # 문제 정의 (6-6 그리드)
    ├── process-slide.tsx       # 해결 과정 (상하 분리)
    ├── outcome-slide.tsx       # 결과/성과 (회고 포함)
    ├── epilogue-slide.tsx      # About + Contact 통합 (5-7 그리드)
    └── screenshot-gallery.tsx  # 이미지 갤러리 (object-contain)
```

### Layout Pattern (뷰포트 제약)

**페이지 스크롤 방지:**
```tsx
<div className="h-screen overflow-hidden px-4 py-2">
  {/* 헤더(64px) + 패딩(16px) + 여유(60px) = 140px */}
  <div className="mx-auto flex h-[calc(100vh-140px)] max-w-[1400px] gap-3">
    <SideNavigation className="w-[160px] flex-shrink-0" />
    <div className="flex flex-1 flex-col gap-2">
      <PortfolioMenuBar />
      <div className="flex-1 overflow-y-scroll snap-y snap-mandatory">
        {/* 슬라이드들 */}
      </div>
    </div>
  </div>
</div>
```

**flex-grow 카드 크기 조정:**
```tsx
const INACTIVE_FLEX = 1;
const ACTIVE_FLEX = 2.5;

<nav className="flex h-full min-h-0 flex-col gap-2">
  <motion.button style={{ flex: isActive ? ACTIVE_FLEX : INACTIVE_FLEX }}>
    {/* min-h-0 필수: flex 자식이 콘텐츠보다 작아질 수 있도록 */}
  </motion.button>
</nav>
```

**smooth scroll과 스냅 충돌 해결:**
```tsx
const goToSection = (index: number) => {
  canvas.style.scrollSnapType = 'none';  // 임시 비활성화
  targetSlide.scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    canvas.style.scrollSnapType = 'y mandatory';  // 복원
  }, 500);
};
```

### MDX Content (`docs/content/portfolio/`)

```typescript
import { getPortfolioSections } from "@/lib/portfolio-mdx";
const sections = await getPortfolioSections();
```

**Frontmatter 형식:**
```yaml
title: "프로젝트명"
order: 1                    # 섹션 순서 (낮을수록 먼저)
color: "#F97316"           # 섹션 테마 색상
textColor: "#FFFFFF"       # 텍스트 색상
slides:
  - type: "cover"          # cover | problem | process | outcome | reflection | profile | contact | epilogue
    title: "슬라이드 제목"
```

### Design Decisions

- **페이지 스크롤 금지**: 포트폴리오 UX에서 페이지 스크롤은 나쁜 경험 → 캔버스 내부 스크롤만 허용
- **Flat Slide 구조**: 섹션-슬라이드 2중 구조를 flat 배열로 펼쳐서 선형 탐색 가능
- **라이트 테마 강제**: 프레젠테이션용이므로 다크모드 비활성화
- **모바일**: 좌측 네비게이션 숨김 (`hidden md:flex`)

## 포트폴리오 디자인 시스템

포트폴리오 슬라이드에서 사용하는 타이포그래피, 그리드, 컴포넌트 규칙.

### 타이포그래피 (5단계)

`@/components/portfolio/typography`에서 시맨틱 컴포넌트 import:

| 컴포넌트 | 클래스 | 용도 |
|---------|--------|------|
| `<Hero>` | `text-6xl font-bold text-foreground` | 커버 메인 타이틀 |
| `<H1>` | `text-4xl font-bold text-foreground` | 프로젝트 제목 |
| `<H2>` | `text-2xl font-semibold text-foreground` | 슬라이드 제목, 소제목 |
| `<Body>` | `text-base text-foreground/80` | 본문, 설명 |
| `<Caption>` | `text-sm font-medium text-muted` | 메타 정보, 라벨 |

**사용 예시:**
```tsx
import { Hero, H1, Body, Caption } from "@/components/portfolio/typography";

<Hero>김한솔</Hero>
<H1>CRO 분석 자동화</H1>
<Body>전환율 개선 프로젝트 설명...</Body>
<Caption className="text-accent">UX 리서치 · 데이터 분석</Caption>
```

### 그리드 시스템 (12컬럼)

`@/components/portfolio/grid`에서 `Grid` 컴포넌트 import.

**cols prop으로 레이아웃 지정:**
| cols | 비율 | 용도 |
|------|------|------|
| `"4-8"` | 4:8 | IntroSlide (좌측 프로필 + 우측 콘텐츠) |
| `"5-7"` | 5:7 | EpilogueSlide (About + 스킬) |
| `"6-6"` | 6:6 | ProblemSlide (컨텍스트 + 다이어그램) |
| `"full"` | 12 | 단일 컬럼 |

**사용 예시:**
```tsx
import { Grid } from "@/components/portfolio/grid";

// 자식 2개가 자동으로 4:8 비율로 배치
<Grid cols="4-8" gap="lg" align="center">
  <div>좌측 4컬럼</div>
  <div>우측 8컬럼</div>
</Grid>

// 커스텀 span이 필요하면 GridItem 사용
import { Grid, GridItem } from "@/components/portfolio/grid";

<div className="grid grid-cols-12 gap-6">
  <GridItem span={3}>3컬럼</GridItem>
  <GridItem span={9}>9컬럼</GridItem>
</div>
```

### 카드 사용 원칙

**사용하지 말아야 할 때:**
- 단순 텍스트 나열 (리스트로 충분)
- 이미 그리드로 구분된 영역
- 정보 밀도가 낮은 경우

**사용해야 할 때:**
- 클릭/호버 인터랙션이 필요한 요소
- 시각적으로 그룹핑해야 하는 독립 단위
- 메트릭/통계 강조 (숫자 카드)

**대안 표현:**
```tsx
// 카드 대신 배경색 + 패딩으로 영역 구분
<div className="bg-muted/30 rounded-lg p-6">
  <h3 className="font-medium">섹션 제목</h3>
  <p className="text-muted-foreground">내용</p>
</div>

// 카드 대신 리스트로 표현
<ul className="space-y-3">
  <li className="flex items-start gap-3">
    <span className="text-accent">•</span>
    <span>항목 내용</span>
  </li>
</ul>
```

### 슬라이드 컴포넌트 구조

`@/components/portfolio/slides/`에 위치:

| 컴포넌트 | 용도 | 주요 props |
|---------|------|-----------|
| `IntroSlide` | 포트폴리오 전체 커버 | name, role, intro[], links[], projects[] |
| `CoverSlide` | 개별 프로젝트 커버 | name, title, description, meta, outcomes[] |
| `ProblemSlide` | 문제 정의 (6:6 그리드) | heading, context[], children(다이어그램) |
| `ProcessSlide` | 해결 과정 | heading, approach[], children(다이어그램) |
| `OutcomeSlide` | 결과/성과 | heading, strengths[], improvements[], children |
| `EpilogueSlide` | About + Contact 통합 (5:7 그리드) | name, role, skills[], links[], philosophy[] |

**슬라이드 선택 가이드:**
```
포트폴리오 첫 화면 → IntroSlide (이름, 직함, 연락처, 프로젝트 목록)
프로젝트 시작     → CoverSlide (프로젝트명, 기간, 역할, 성과 수치)
무엇이 문제였나   → ProblemSlide (배경 컨텍스트 + 비즈니스 임팩트)
어떻게 해결했나   → ProcessSlide (접근 방식 + 다이어그램/스크린샷)
결과는 무엇인가   → OutcomeSlide (성과 수치 + 회고)
포트폴리오 마무리 → EpilogueSlide (About + Contact 통합)
```

### 이미지 레이아웃 패턴

**원칙:** 스크린샷은 절대 잘리면 안 됨 → `object-contain` 사용

**단일 이미지:**
```tsx
<div className="flex items-center justify-center">
  <img
    src={url}
    alt={alt}
    className="object-contain w-full h-auto max-h-[400px] rounded-lg"
  />
</div>
```

**Before/After 비교:**
```tsx
import { BeforeAfterComparison } from "@/components/portfolio/slides/screenshot-gallery";

<BeforeAfterComparison
  before={{ src: "/images/before.png", alt: "AS-IS", caption: "기존 UI" }}
  after={{ src: "/images/after.png", alt: "TO-BE", caption: "개선 UI" }}
/>
```

## 다이어그램 컴포넌트

포트폴리오 슬라이드에 사용되는 인터랙티브 다이어그램 컴포넌트 패턴.

### 디렉토리 구조

```
src/components/portfolio/diagrams/
├── hooks/                      # 공통 훅
│   └── use-in-view-animation.ts  # 진입 애니메이션 훅
├── [project-name]/             # 프로젝트별 다이어그램
│   ├── index.ts               # 배럴 파일 (export 관리)
│   ├── SomeDiagram.tsx
│   └── AnotherDiagram.tsx
└── index.ts                    # 전체 배럴 파일
```

### 다이어그램 구현 패턴

**진입 애니메이션 (useInView + Framer Motion):**
```tsx
import { useInView } from "framer-motion";

export function SomeDiagram() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* 다이어그램 내용 */}
    </motion.div>
  );
}
```

### 슬라이드-다이어그램 연결

`page.tsx`의 `getSlideDiagram()` 함수에서 섹션/슬라이드 타입별 매핑:

```tsx
function getSlideDiagram(sectionSlug: string, slideType: string): React.ReactNode {
  if (sectionSlug === "cro-optimization") {
    if (slideType === "process") return <CROProcessDiagram />;
    if (slideType === "outcome") return <CROOutcomeDiagram />;
  }
  if (sectionSlug === "labeling-tool") {
    if (slideType === "problem") return <LabelingProblemDiagram />;
  }
  return null;
}

// 슬라이드 컴포넌트에 children으로 전달
<ProcessSlide {...props}>
  {getSlideDiagram(section.slug, slide.type)}
</ProcessSlide>
```

### 프로젝트별 테마 색상

| 프로젝트 | 색상 코드 | 용도 |
|---------|----------|------|
| CRO 최적화 | `#F97316` (오렌지) | 메인 액센트 |
| 라벨링 툴 | `#EC4899` (핑크) | 데이터/AI |
| 디자인 시스템 | `#7C3AED` (보라) | 시스템/구조 |
| UI Flow | `#2563EB` (파랑) | 인터랙션/흐름 |

### MDX와 React 컴포넌트 통합

**방법 1: mdx-content.tsx에 등록**
```tsx
// src/components/mdx-content.tsx
const components = {
  CRODiagram: dynamic(() => import("./portfolio/diagrams/cro")),
  // ...
};
```

**방법 2: page.tsx에서 직접 렌더링**
```tsx
// 슬라이드 타입에 따라 조건부 렌더링
{slide.type === "process" && <ProcessDiagram />}
```
