# Design System

## Color Tokens

### Semantic Colors

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--color-background` | `#ffffff` | `#0a0a0a` | Page background |
| `--color-foreground` | `#0a0a0a` | `#fafafa` | Primary text |
| `--color-muted` | `#737373` | `#a3a3a3` | Secondary text, descriptions |
| `--color-muted-foreground` | `#a3a3a3` | `#737373` | Tertiary text, placeholders |
| `--color-border` | `#e5e5e5` | `#262626` | Borders, dividers |
| `--color-secondary` | `#f5f5f5` | `#171717` | Card backgrounds, code blocks |
| `--color-accent` | `#F97316` | `#FB923C` | Primary accent (orange) |
| `--color-accent-light` | `#FB923C` | `#FDBA74` | Lighter accent |
| `--color-accent-lighter` | `#FDBA74` | `#FED7AA` | Lightest accent |
| `--color-accent-dark` | `#EA580C` | `#F97316` | Darker accent |

### Special Colors (CSS variables only)

| Token | Light Mode | Dark Mode | Usage |
|-------|------------|-----------|-------|
| `--accent-ripple` | `rgba(249, 115, 22, 0.3)` | `rgba(251, 146, 60, 0.3)` | Beam effects |
| `--accent-hover` | `rgba(249, 115, 22, 0.4)` | `rgba(251, 146, 60, 0.4)` | Hover states |
| `--accent-glow` | `rgba(249, 115, 22, 0.15)` | `rgba(251, 146, 60, 0.15)` | Glow effects |

---

## Components & Theme Usage

### Layout Components

#### Header (`header.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Logo text | `text-foreground` | `text-foreground` |
| Logo badge | `bg-accent text-white` | `bg-accent text-white` |
| Nav links | `text-foreground` | `text-foreground` |
| Nav active bubble | `bg-foreground` | `bg-foreground` |
| Theme toggle | `text-muted` → `text-foreground` | `text-muted` → `text-foreground` |

#### Background Beams (`background-beams.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Container | `bg-background` | `bg-background` |
| Beams | `from-accent via-accent-light to-transparent` | Same |
| Explosion | `via-accent`, `from-accent to-accent-light` | Same |

### Page Components

#### Hero Section (`hero-section.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Title text | `text-foreground` (inherited) | `text-foreground` |
| Cursor | `text-accent` | `text-accent` |

#### Animated Text (`animated-text.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Text | Inherited from parent | Same |
| Underline | `bg-accent` | `bg-accent` |

#### Project Showcase (`project-showcase.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Section title | `text-muted` | `text-muted` |
| Card hover bg | `bg-secondary/50` | `bg-secondary/50` |
| Project title | `text-foreground` | `text-foreground` |
| Project title underline | `bg-accent` | `bg-accent` |
| Description | `text-muted` → `text-foreground/70` | Same |
| Year | `text-muted` → `text-foreground/60` | Same |
| Dividers | `border-border` | `border-border` |
| Preview image container | `bg-secondary` | `bg-secondary` |
| Image overlay | `from-background/20` | `from-background/20` |

#### MDX Content (`mdx-content.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| h1, h2 | Inherited (foreground) | Same |
| h3 | Inherited (foreground) | Same |
| p, ul, ol, li | `text-muted` | `text-muted` |
| Links | `text-accent` | `text-accent` |
| Code inline | `bg-secondary` | `bg-secondary` |
| Code block | `bg-secondary` | `bg-secondary` |
| Blockquote border | `border-accent` | `border-accent` |
| Blockquote text | `text-muted` | `text-muted` |
| Table borders | `border-border` | `border-border` |
| Table cells | `text-muted` | `text-muted` |
| Strong | `text-foreground` | `text-foreground` |

### Page-Level Usage

#### Home Page (`page.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Section title | `text-muted` | `text-muted` |
| "View all" link | `text-muted` → `text-foreground` | Same |
| Post title | `text-foreground` | `text-foreground` |
| Post title underline | `bg-accent` | `bg-accent` |
| Post date | `text-muted` | `text-muted` |
| Dividers | `border-border` | `border-border` |
| Footer text | `text-muted` | `text-muted` |
| Footer links | `text-muted` → `text-foreground` | Same |

#### Blog Page (`blog/page.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Page title | Inherited (foreground) | Same |
| Page description | `text-muted` | `text-muted` |
| Post title | `text-foreground` | `text-foreground` |
| Post title underline | `bg-accent` | `bg-accent` |
| Post date | `text-muted` | `text-muted` |
| Post description | `text-muted` | `text-muted` |
| Category | `text-muted/70` | `text-muted/70` |
| Dividers | `border-border` | `border-border` |

#### Blog Post (`blog/[slug]/page.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Back link | `text-muted` → `text-foreground` | Same |
| Category/date | `text-muted` | `text-muted` |
| Title | Inherited (foreground) | Same |
| Prose | `prose-neutral dark:prose-invert` | Same |
| Loading skeleton | `bg-secondary` | `bg-secondary` |

#### Projects Page (`projects/page.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Page title | Inherited (foreground) | Same |
| Page description | `text-muted` | `text-muted` |
| Card border | `border-border` → `border-foreground/20` | Same |
| Card title | `text-foreground` | `text-foreground` |
| Card title underline | `bg-accent` | `bg-accent` |
| Card description | `text-muted` | `text-muted` |
| Tech badges | `text-muted/70 bg-secondary` | Same |

#### About Page (`about/page.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Title | Inherited (foreground) | Same |
| Content | Via MDXContent | Same |

#### Not Found (`not-found.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| 404 text | `text-foreground` | `text-foreground` |
| Description | `text-muted` | `text-muted` |
| Button | `text-foreground border-border` → `bg-secondary` | Same |

#### Loading (`loading.tsx`)
| Element | Light | Dark |
|---------|-------|------|
| Spinner border | `border-muted border-t-accent` | Same |
| Loading text | `text-muted` | `text-muted` |

---

## Tailwind Classes to CSS Variable Mapping

For dark mode to work correctly in Tailwind CSS v4, we need:

```css
/* Background */
.bg-background { background-color: var(--color-background); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }

/* Text */
.text-foreground { color: var(--color-foreground); }
.text-muted { color: var(--color-muted); }
.text-accent { color: var(--color-accent); }

/* Border */
.border-border { border-color: var(--color-border); }
.border-accent { border-color: var(--color-accent); }
```

These are automatically generated by `@theme inline`, but `.dark` class must override the CSS variables at the `:root` level.

---

## Implementation Notes

1. **CSS Variable Override**: The `.dark` selector must be on `<html>` element (handled by `next-themes`)
2. **Tailwind v4 Compatibility**: Use `@custom-variant dark` for `dark:` prefix support
3. **No Hardcoded Colors**: All color values must use semantic tokens
4. **Gradient Handling**: Gradients using `from-*`, `via-*`, `to-*` need CSS variable support
