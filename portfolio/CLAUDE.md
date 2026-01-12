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
