import { cn } from "@/lib/utils"

// 카테고리별 색상 (블로그)
const categoryColors: Record<string, string> = {
  AX: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  디자인: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  커리어: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
}

// 기술 스택별 색상 (프로젝트)
const techColors: Record<string, string> = {
  React: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
  TypeScript: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "Next.js": "bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200",
  OpenAI: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "Framer Motion": "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  Vue: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  ProseMirror: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
}

// 기본 색상 (매핑되지 않은 태그용)
const defaultColor = "bg-secondary text-muted"

interface TagChipProps {
  label: string
  variant?: "category" | "tech"
  className?: string
}

export function TagChip({ label, variant = "category", className }: TagChipProps) {
  const colorMap = variant === "category" ? categoryColors : techColors
  const colorClass = colorMap[label] || defaultColor

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        colorClass,
        className
      )}
    >
      {label}
    </span>
  )
}
