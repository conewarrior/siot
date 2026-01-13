"use client"

import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"

interface SlideTransitionProps {
  children: ReactNode
  direction: "left" | "right" // 전환 방향
  slideKey: string | number // AnimatePresence key
}

/**
 * 페이지 전환 애니메이션 컴포넌트
 * direction에 따라 슬라이드 방향 결정:
 * - 'right': 다음으로 이동 (새 콘텐츠가 오른쪽에서 들어옴)
 * - 'left': 이전으로 이동 (새 콘텐츠가 왼쪽에서 들어옴)
 */
function SlideTransition({
  children,
  direction,
  slideKey,
}: SlideTransitionProps) {
  // direction에 따른 x 오프셋 계산
  // 'right': 새 콘텐츠가 오른쪽(+)에서 들어오고, 이전 콘텐츠는 왼쪽(-)으로 나감
  // 'left': 새 콘텐츠가 왼쪽(-)에서 들어오고, 이전 콘텐츠는 오른쪽(+)으로 나감
  const xOffset = direction === "right" ? 100 : -100

  const variants = {
    initial: {
      x: `${xOffset}%`,
      opacity: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
    },
    exit: {
      x: `${-xOffset}%`,
      opacity: 0,
    },
  }

  const transition = {
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={slideKey}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={transition}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

export { SlideTransition }
export type { SlideTransitionProps }
