# Design Guide

## Color Palette

### Primary / Accent Color

메인 인터랙션 컬러로 사용되는 오렌지 계열.

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Orange 500** | `#F97316` | `rgb(249, 115, 22)` | Primary accent, CTA buttons |
| **Orange 400** | `#FB923C` | `rgb(251, 146, 60)` | Hover states, highlights |
| **Orange 300** | `#FDBA74` | `rgb(253, 186, 116)` | Light accents, backgrounds |
| **Orange 600** | `#EA580C` | `rgb(234, 88, 12)` | Active states, emphasis |

### Accent with Transparency

인터랙션 효과에 사용되는 투명도 적용 버전.

| Name | Value | Usage |
|------|-------|-------|
| **Ripple Effect** | `rgba(249, 115, 22, 0.3)` | Click ripple animation |
| **Hover Border** | `rgba(249, 115, 22, 0.4)` | Nav link hover effect |
| **Background Glow** | `rgba(249, 115, 22, 0.15)` | Subtle background highlights |
| **Text Highlight** | `rgba(249, 115, 22, 0.2)` | Text selection, focus states |

### Base Colors

| Name | Light Mode | Dark Mode | Usage |
|------|------------|-----------|-------|
| **Background** | `#FFFFFF` | `#0A0A0A` | Page background |
| **Foreground** | `#0A0A0A` | `#FAFAFA` | Primary text |
| **Muted** | `#737373` | `#A3A3A3` | Secondary text |
| **Border** | `#E5E5E5` | `#262626` | Dividers, borders |
| **Secondary** | `#F5F5F5` | `#171717` | Card backgrounds |

---

## Typography

### Font Family

- **Sans**: Pretendard
- **Mono**: SF Mono, Menlo, monospace

### Font Sizes

| Name | Size | Usage |
|------|------|-------|
| **Hero** | `text-4xl` / `text-5xl` | Hero section titles |
| **Title** | `text-2xl` / `text-3xl` | Page titles |
| **Heading** | `text-lg` / `text-xl` | Section headings |
| **Body** | `text-base` | Body text |
| **Small** | `text-sm` | Labels, captions |
| **Mono** | `text-xs font-mono` | Dates, tags |

---

## Interactive Elements

### Ripple Button Effect

클릭 시 마우스 위치에서 원형으로 퍼지는 리플 효과.

```css
/* Ripple Color */
background-color: rgba(249, 115, 22, 0.3);

/* Animation */
animation: ripple 600ms ease-out forwards;
```

### Hover Border Effect

마우스 위치에서 보더가 원형으로 퍼지는 효과.

```css
/* Border Effect Color */
background-color: rgba(249, 115, 22, 0.4);

/* Transition */
transition: width 0.9s ease-out, height 0.9s ease-out;
```

### Text Highlight (Animated)

텍스트에 그라데이션 배경이 왼쪽에서 오른쪽으로 채워지는 효과.

```css
/* Gradient */
background: linear-gradient(to right, #FB923C, #F97316);

/* From-To (Tailwind) */
from-orange-400 to-orange-500
```

---

## CSS Variables Reference

```css
:root {
  /* Base */
  --background: #ffffff;
  --foreground: #0a0a0a;
  --muted: #737373;
  --border: #e5e5e5;
  --secondary: #f5f5f5;

  /* Accent (Orange) */
  --accent: #F97316;
  --accent-light: #FB923C;
  --accent-lighter: #FDBA74;
  --accent-dark: #EA580C;

  /* Accent with Alpha */
  --accent-ripple: rgba(249, 115, 22, 0.3);
  --accent-hover: rgba(249, 115, 22, 0.4);
  --accent-glow: rgba(249, 115, 22, 0.15);
}
```

---

## Component Color Usage

| Component | Color Variable | Notes |
|-----------|----------------|-------|
| NavLink Hover | `--accent-hover` | Border ripple effect |
| NavLink Click | `--accent-ripple` | Click ripple |
| NavLink Active | `--accent-hover` | Filled background |
| Text Highlight | `from-orange-400 to-orange-500` | Gradient background |
| Dot Pattern Spotlight | `--accent` | Mouse-following highlight |

---

## Gradients

### Primary Gradient

```css
background: linear-gradient(135deg, #FB923C 0%, #F97316 100%);
```

### Subtle Glow

```css
background: radial-gradient(
  circle at center,
  rgba(249, 115, 22, 0.15) 0%,
  transparent 70%
);
```
