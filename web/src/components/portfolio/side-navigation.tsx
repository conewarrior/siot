"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  title: string
  color: string
  textColor: string
  totalSlides: number
}

interface SideNavigationProps {
  sections: Section[]
  currentIndex: number
  currentSlideInSection: number
  onSelect: (index: number) => void
  className?: string
}

// 활성 카드는 비활성 카드의 2.5배 비율로 확장
const INACTIVE_FLEX = 1
const ACTIVE_FLEX = 2.5

function SideNavigation({
  sections,
  currentIndex,
  currentSlideInSection,
  onSelect,
  className,
}: SideNavigationProps) {
  return (
    <nav
      className={cn("flex h-full min-h-0 flex-col gap-2", className)}
      aria-label="섹션 내비게이션"
    >
      {sections.map((section, index) => {
        const isActive = currentIndex === index
        const sectionNumber = index.toString().padStart(2, "0")

        return (
          <motion.button
            key={section.id}
            onClick={() => onSelect(index)}
            className={cn(
              "relative flex w-full min-h-0 flex-row rounded-xl p-3 text-left transition-colors overflow-hidden",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            )}
            style={{
              backgroundColor: section.color,
              color: section.textColor,
              flex: isActive ? ACTIVE_FLEX : INACTIVE_FLEX,
            }}
            whileHover={{ scale: isActive ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            aria-label={`${section.title} 섹션으로 이동`}
            aria-current={isActive ? "page" : undefined}
          >
            {/* 좌측 영역: 번호 + 타이틀 */}
            <div className="flex flex-1 flex-col justify-between">
              <span className="text-sm font-medium opacity-80">
                {sectionNumber}
              </span>
              <span className="text-sm font-semibold">
                {section.title}
              </span>
            </div>

            {/* 우측 영역: 스크롤 진행 인디케이터 (활성 카드만) */}
            {isActive && section.totalSlides > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-1 ml-2 h-full"
              >
                {Array.from({ length: section.totalSlides }).map((_, slideIdx) => (
                  <div
                    key={slideIdx}
                    className={cn(
                      "w-1 flex-1 min-h-2 rounded-full transition-all",
                      slideIdx === currentSlideInSection
                        ? "bg-current opacity-100"
                        : "bg-current opacity-30"
                    )}
                  />
                ))}
              </motion.div>
            )}
          </motion.button>
        )
      })}
    </nav>
  )
}

export { SideNavigation }
export type { Section, SideNavigationProps }
