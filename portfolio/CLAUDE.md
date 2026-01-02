# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Architecture

This is a Next.js 16 portfolio site using App Router with TypeScript and Tailwind CSS v4.

### Tech Stack
- **Next.js 16** with App Router (React 19)
- **Tailwind CSS v4** (uses `@tailwindcss/postcss`, no config file)
- **Framer Motion** for animations
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
│   ├── hero-section.tsx   # Hero with TextRotate (client component)
│   ├── mdx-content.tsx    # MDX renderer with styled components
│   ├── text-rotate.tsx    # Rotating text with staggered character animation
│   ├── project-showcase.tsx # Project list with mouse-following image preview
│   ├── header.tsx         # Navigation
│   └── nav-link.tsx       # Menu link with scale hover
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

Frontmatter format for blog posts:
```mdx
---
title: "제목"
description: "설명"
date: "2024-12-28"
category: "디자인" | "개발"
published: true
---
```

### Animation Patterns

**TextRotate** (Hero section):
- Used in hero for rotating words: "make it [pop/snappy/flow/...]"
- Wrapped in `LayoutGroup` + `motion.span` for smooth width transitions
- Spring animation: `damping: 20, stiffness: 400`

**AnimatedText** (Page titles):
- Letter-by-letter staggered entrance animation
- Synced underline that appears after last letter
- Props: `duration`, `delay`, `underlineHeight`, `underlineOffset`

**Hover underline** (List items):
- Standard pattern: `<span className="absolute left-0 -bottom-0.5 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />`

### Styling

- Theme uses CSS variables in `globals.css`
- Accent color: orange (#F97316 light, #FB923C dark)
- Colors exposed via `@theme inline`: `text-muted`, `bg-secondary`, `border-border`, `bg-accent`
- Path alias: `@/*` maps to `./src/*`

### Korean Content

Site content is in Korean. See `docs/planning/roadmap.md` for development status.
