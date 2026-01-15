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
│   ├── globals.css        # Theme variables (accent = orange #F97316)
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
│   ├── side-project-grid.tsx # Side project grid with floating image hover (/projects)
│   ├── header.tsx         # Navigation with TextRotate logo
│   ├── typewriter.tsx     # Typing/deleting text animation
│   └── theme-toggle.tsx   # Dark/light mode toggle
└── lib/
    ├── utils.ts           # cn() helper (clsx + tailwind-merge)
    └── mdx.ts             # MDX utilities (getBlogPosts, getProjects, etc.)

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

Frontmatter for projects:
```yaml
title: "프로젝트명"
description: "설명"
year: "2025"
link: "https://..."
image: "/images/..."
tech: ["React", "TypeScript"]
featured: true
```

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

### Theming & Styling

**Dark Mode**:
- Uses `next-themes` with class-based switching (`.dark` class on html)
- `ThemeProvider` wraps the app in `layout.tsx`
- `ThemeToggle` component toggles between light/dark
- CSS variables defined in `globals.css` for `:root` (light) and `.dark`

**Colors**:
- Accent: orange (#F97316 light, #FB923C dark)
- Colors via `@theme inline`: `text-foreground`, `text-muted`, `bg-secondary`, `bg-accent`
- Path alias: `@/*` maps to `./src/*`

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
├── side-navigation.tsx     # 좌측 섹션 네비게이션 (flex-grow 카드 + 슬라이드 인디케이터)
├── portfolio-menu-bar.tsx  # 상단 메뉴바 (섹션 색상 + 슬라이드 진행률)
└── slides/                 # 슬라이드 타입별 템플릿
    ├── cover-slide.tsx
    ├── problem-slide.tsx
    ├── process-slide.tsx
    ├── outcome-slide.tsx
    ├── reflection-slide.tsx
    ├── profile-slide.tsx
    ├── contact-slide.tsx
    ├── epilogue-slide.tsx      # Profile + Contact 통합 (About 섹션용)
    └── screenshot-gallery.tsx  # 이미지 갤러리 + Before/After 비교
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
