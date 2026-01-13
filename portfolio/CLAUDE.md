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
│   ├── project-showcase.tsx # Project list with mouse-following image preview
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

## Portfolio Page (v2 - 스크롤 기반)

포트폴리오 슬라이드 뷰어 (`/portfolio` 라우트)는 스크롤 스냅 기반의 세로 스크롤 프레젠테이션 페이지.

### v2 변경사항 (2025-01)

**캐러셀 → 스크롤 스냅 전환:**
- 좌우 캐러셀을 세로 스크롤 + 100vh 스냅 방식으로 변경
- 좌측 네비게이션: 스크롤 진행률에 따라 카드 확장
- 페이지 인디케이터: 프로그레스 바 형태
- 기존 사이트 헤더 표시

**삭제된 컴포넌트:**
- `navigation-arrows.tsx` - 좌우 화살표 버튼
- `keyboard-navigation.tsx` - 키보드 이벤트 핸들러
- `slide-transition.tsx` - 좌우 슬라이드 전환 애니메이션
- `section-entry.tsx` - 섹션 진입 알림
- `use-portfolio-navigation.ts` - 캐러셀 네비게이션 훅

### Route Structure
```
src/app/portfolio/
├── layout.tsx          # 헤더 포함, 라이트 테마 강제, robots noindex
├── page.tsx            # 스크롤 스냅 컨테이너 + Intersection Observer
src/api/portfolio/
└── route.ts            # 섹션 데이터 API
```

### Component Architecture
```
src/components/portfolio/
├── slide-container.tsx     # 슬라이드 래퍼 (비율 유지)
├── staggered-content.tsx   # Intersection Observer 기반 순차 등장 애니메이션
├── side-navigation.tsx     # 좌측 섹션 네비게이션 (스크롤 진행률 연동)
├── page-indicator.tsx      # 하단 프로그레스 바 + PDF 버튼
├── mobile-layout.tsx       # 모바일 반응형 레이아웃
└── slides/                 # 슬라이드 타입별 템플릿
    ├── cover-slide.tsx
    ├── problem-slide.tsx
    ├── process-slide.tsx
    ├── outcome-slide.tsx
    └── reflection-slide.tsx
```

### Scroll Snap Pattern

**컨테이너 설정:**
```tsx
<main
  className="h-screen overflow-y-scroll snap-y snap-mandatory"
  ref={containerRef}
>
  {sections.map(section => (
    <section className="h-screen snap-start">
      <SlideComponent />
    </section>
  ))}
</main>
```

**smooth scroll과 스냅 충돌 해결:**
프로그래매틱 스크롤 시 스냅이 방해할 수 있으므로 임시 비활성화:
```tsx
const scrollToSection = (index: number) => {
  container.style.scrollSnapType = 'none';  // 임시 비활성화
  slideRefs[index].scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    container.style.scrollSnapType = 'y mandatory';  // 복원
  }, 500);
};
```

### Intersection Observer Patterns

**현재 섹션 감지 (스크롤 진행률용):**
```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = slideRefs.indexOf(entry.target);
          setCurrentIndex(index);
        }
      });
    },
    { root: containerRef.current, threshold: 0.5 }
  );
  slideRefs.forEach(ref => ref && observer.observe(ref));
  return () => observer.disconnect();
}, []);
```

**1회성 진입 애니메이션 (StaggeredContent):**
```tsx
const [hasAnimated, setHasAnimated] = useState(false);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !hasAnimated) {
        setHasAnimated(true);
      }
    },
    { threshold: 0.3 }
  );
  // 첫 진입 시에만 애니메이션, 재진입 시 즉시 표시
}, []);
```

### MDX Content (`docs/content/portfolio/`)

슬라이드 콘텐츠는 `portfolio-mdx.ts`로 관리:

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
  - type: "cover"          # cover | problem | process | outcome | reflection
    title: "슬라이드 제목"
  - type: "problem"
    title: "문제 정의"
```

### Semantic HTML Rules (리뷰 학습)

**중복 시맨틱 태그 피하기:**
- layout에서 `<main>`을 쓰면 page에서는 `<div>` 사용
- page에서 `<section>`으로 감싸면 슬라이드 컴포넌트는 `<div>` 사용

**ARIA 라벨 필수:**
```tsx
<main role="main" aria-label="포트폴리오 슬라이드">
  <section aria-label={`${sectionName} - ${slideTitle}`}>
```

### Design Decisions

- **라이트 테마 강제**: 포트폴리오는 프레젠테이션용이므로 다크모드 비활성화
- **Flat Slide 구조**: 섹션-슬라이드 2중 구조를 flat 배열로 펼쳐서 선형 탐색 가능
- **API Route 사용**: 클라이언트 컴포넌트에서 MDX 데이터 접근을 위해 `/api/portfolio` 엔드포인트 활용
- **모바일**: 좌측 네비게이션 숨김 (`hidden md:block`)
