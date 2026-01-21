"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  title: string
  totalSlides: number
}

interface TopNavigationProps {
  sections: Section[]
  currentIndex: number
  currentSlideInSection: number
  onSelect: (index: number) => void
  className?: string
}

// 녹색 팔레트 (Tailwind v4에서 CSS 변수가 동적 클래스에서 작동하지 않아 직접 사용)
const COLORS = {
  primary: "#327039",        // Forest Fern
  primaryDark: "#133020",    // Tilled Earth
  bg: "#F8EDD9",             // Alabaster Hay
  green100: "#E8F5E9",
}

function TopNavigation({
  sections,
  currentIndex,
  currentSlideInSection,
  onSelect,
  className,
}: TopNavigationProps) {
  return (
    <nav
      className={cn(
        "flex items-center gap-1",
        className
      )}
      aria-label="섹션 내비게이션"
    >
      {sections.map((section, index) => {
        const isActive = currentIndex === index

        return (
          <motion.button
            key={section.id}
            onClick={() => onSelect(index)}
            className={cn(
              "relative flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            )}
            style={{
              backgroundColor: isActive ? COLORS.primary : "transparent",
              color: isActive ? "white" : COLORS.primaryDark,
            }}
            whileHover={{
              scale: isActive ? 1 : 1.02,
              backgroundColor: isActive ? COLORS.primary : COLORS.green100,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
            aria-label={`${section.title} 섹션으로 이동`}
            aria-current={isActive ? "page" : undefined}
          >
            <span>{section.title}</span>

            {/* 슬라이드 진행 인디케이터 (활성 탭, 슬라이드 2개 이상) */}
            {isActive && section.totalSlides > 1 && (
              <div className="flex items-center gap-1 ml-1">
                {Array.from({ length: section.totalSlides }).map((_, slideIdx) => (
                  <div
                    key={slideIdx}
                    className={cn(
                      "w-1.5 h-1.5 rounded-full transition-all",
                      slideIdx === currentSlideInSection
                        ? "bg-white"
                        : "bg-white/40"
                    )}
                  />
                ))}
              </div>
            )}
          </motion.button>
        )
      })}
    </nav>
  )
}

export { TopNavigation }
export type { Section, TopNavigationProps }
