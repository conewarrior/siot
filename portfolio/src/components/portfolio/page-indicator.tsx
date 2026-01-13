"use client"

import { cn, formatNumber } from "@/lib/utils"

interface PageIndicatorProps {
  current: number      // 현재 슬라이드 (1-indexed)
  total: number        // 전체 슬라이드 수
  sectionName?: string // 현재 섹션/프로젝트명 (선택적)
  className?: string
  position?: "fixed" | "relative"
}

/**
 * 페이지 인디케이터 컴포넌트
 * therawmaterials.com 스타일 참고: "(7-Eleven Mobile)" + "● 04 / 23" 형식
 *
 * @example
 * // 기본 사용
 * <PageIndicator current={2} total={5} />
 *
 * // 섹션명과 함께
 * <PageIndicator current={4} total={23} sectionName="7-Eleven Mobile" />
 *
 * // 상대 위치 (부모 컨테이너 내 배치)
 * <PageIndicator current={1} total={10} position="relative" />
 */
function PageIndicator({
  current,
  total,
  sectionName,
  className,
  position = "fixed",
}: PageIndicatorProps) {
  return (
    <div
      className={cn(
        "z-50 flex items-center gap-3",
        position === "fixed" && "fixed bottom-6 right-6",
        position === "relative" && "relative",
        className
      )}
      role="status"
      aria-label={`${current} / ${total} 페이지${sectionName ? `, ${sectionName}` : ""}`}
    >
      {/* 섹션명 (선택적) */}
      {sectionName && (
        <span className="text-xs text-muted-foreground">
          ({sectionName})
        </span>
      )}

      {/* 페이지 번호: ● 04 / 23 */}
      <span className="flex items-center gap-1.5 text-xs text-muted">
        <span className="text-accent" aria-hidden="true">
          ●
        </span>
        <span className="tabular-nums tracking-wide">
          {formatNumber(current)}
        </span>
        <span className="text-muted-foreground">/</span>
        <span className="tabular-nums tracking-wide text-muted-foreground">
          {formatNumber(total)}
        </span>
      </span>
    </div>
  )
}

export { PageIndicator }
export type { PageIndicatorProps }
