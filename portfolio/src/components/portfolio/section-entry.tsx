"use client"

import { motion, AnimatePresence } from "framer-motion"
import { cn, formatNumber } from "@/lib/utils"

interface SectionEntryProps {
  sectionName: string
  isVisible: boolean
  currentIndex?: number
  totalCount?: number
  className?: string
}

/**
 * 섹션 진입 알림 컴포넌트
 * therawmaterials.com 스타일 참고: "You are now entering ( Work ) section  ● 03 / 01"
 *
 * @example
 * // 기본 사용
 * <SectionEntry sectionName="Work" isVisible={showEntry} />
 *
 * // 페이지 인디케이터와 함께
 * <SectionEntry
 *   sectionName="Projects"
 *   isVisible={showEntry}
 *   currentIndex={3}
 *   totalCount={5}
 * />
 */
function SectionEntry({
  sectionName,
  isVisible,
  currentIndex,
  totalCount,
  className,
}: SectionEntryProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 300,
          }}
          className={cn(
            "fixed top-6 left-1/2 -translate-x-1/2 z-50",
            "flex items-center gap-4",
            "px-4 py-2",
            "bg-background/80 backdrop-blur-sm",
            "border border-border rounded-full",
            "shadow-sm",
            className
          )}
          role="status"
          aria-live="polite"
          aria-label={`${sectionName} 섹션에 진입했습니다`}
        >
          {/* 진입 메시지 */}
          <span className="text-xs text-muted tracking-wide">
            You are now entering{" "}
            <span className="text-foreground font-medium">
              ( {sectionName} )
            </span>{" "}
            section
          </span>

          {/* 페이지 인디케이터 (선택적) */}
          {currentIndex !== undefined && totalCount !== undefined && (
            <span className="flex items-center gap-1.5 text-xs text-muted">
              <span className="text-accent" aria-hidden="true">
                ●
              </span>
              <span className="tabular-nums tracking-wide">
                {formatNumber(currentIndex)}
              </span>
              <span className="text-muted-foreground">/</span>
              <span className="tabular-nums tracking-wide text-muted-foreground">
                {formatNumber(totalCount)}
              </span>
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export { SectionEntry }
export type { SectionEntryProps }
