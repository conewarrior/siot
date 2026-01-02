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
- **Next.js 16** with App Router
- **React 19** with Server Components
- **Tailwind CSS v4** (uses `@tailwindcss/postcss`, no config file)
- **TypeScript** with strict mode
- **Fonts**: Geist Sans, Geist Mono, Instrument Serif (via `next/font`)

### Project Structure

```
src/
├── app/                    # App Router pages
│   ├── page.tsx           # Home (Hero + Recent Posts + Projects)
│   ├── layout.tsx         # Root layout with fonts and global styles
│   ├── globals.css        # Theme variables and base styles
│   ├── blog/
│   │   ├── page.tsx       # Blog list
│   │   └── [slug]/page.tsx # Individual post (static content)
│   ├── projects/page.tsx  # Projects gallery
│   └── about/page.tsx     # About page
└── components/
    ├── header.tsx         # Navigation with active state
    └── project-showcase.tsx # Interactive project cards with mouse-following image
```

### Styling Conventions

- Theme uses CSS variables defined in `globals.css` (background, foreground, muted, border, secondary, accent)
- Dark/light mode via `prefers-color-scheme` media query
- Colors are exposed via `@theme inline` for Tailwind: `text-muted`, `bg-secondary`, `border-border`, etc.
- Path alias: `@/*` maps to `./src/*`

### Content

Blog posts are currently stored as static data in `src/app/blog/[slug]/page.tsx`. To add new posts, add entries to the `posts` object with title, date, category, and markdown-like content.
