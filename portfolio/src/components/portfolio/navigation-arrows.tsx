"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavigationArrowsProps {
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}

/**
 * 화면 양쪽에 배치되는 좌우 화살표 내비게이션
 * 슬라이드 간 이동을 위한 버튼으로, 첫/마지막 슬라이드에서 비활성화
 */
function NavigationArrows({
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: NavigationArrowsProps) {
  const buttonBaseClass = cn(
    "fixed top-1/2 z-50 -translate-y-1/2",
    "flex h-12 w-12 items-center justify-center rounded-full",
    "bg-background/80 backdrop-blur-sm border border-border",
    "text-foreground shadow-lg",
    "transition-opacity duration-200",
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
  )

  const disabledClass = "opacity-30 cursor-not-allowed"
  const enabledClass = "cursor-pointer"

  return (
    <>
      {/* 이전 버튼 (좌측) */}
      <motion.button
        onClick={hasPrev ? onPrev : undefined}
        disabled={!hasPrev}
        className={cn(
          buttonBaseClass,
          "left-4 md:left-8",
          hasPrev ? enabledClass : disabledClass
        )}
        whileHover={hasPrev ? { scale: 1.1 } : undefined}
        whileTap={hasPrev ? { scale: 0.95 } : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        aria-label="이전 슬라이드"
        aria-disabled={!hasPrev}
      >
        <ChevronLeft className="h-6 w-6" />
      </motion.button>

      {/* 다음 버튼 (우측) */}
      <motion.button
        onClick={hasNext ? onNext : undefined}
        disabled={!hasNext}
        className={cn(
          buttonBaseClass,
          "right-4 md:right-8",
          hasNext ? enabledClass : disabledClass
        )}
        whileHover={hasNext ? { scale: 1.1 } : undefined}
        whileTap={hasNext ? { scale: 0.95 } : undefined}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 20,
        }}
        aria-label="다음 슬라이드"
        aria-disabled={!hasNext}
      >
        <ChevronRight className="h-6 w-6" />
      </motion.button>
    </>
  )
}

export { NavigationArrows }
export type { NavigationArrowsProps }
