"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface Section {
  id: string
  title: string
  color: string
  textColor: string
}

interface SideNavigationProps {
  sections: Section[]
  currentIndex: number
  sectionProgress?: number // 0-1, 현재 섹션 내 진행률 (선택적)
  onSelect: (index: number) => void
}

// 카드 높이 상수
const BASE_HEIGHT = 40
const MAX_EXPANDED_HEIGHT = 80

function SideNavigation({ sections, currentIndex, sectionProgress = 0, onSelect }: SideNavigationProps) {
  return (
    <nav
      className="fixed left-6 top-1/2 z-50 -translate-y-1/2 hidden md:block"
      aria-label="섹션 내비게이션"
    >
      <ul className="flex flex-col gap-2">
        {sections.map((section, index) => {
          const isActive = currentIndex === index
          const sectionNumber = index.toString().padStart(2, "0")

          // 활성 카드의 높이 계산: 기본 40px + 진행률에 따라 최대 40px 추가
          const cardHeight = isActive
            ? BASE_HEIGHT + sectionProgress * (MAX_EXPANDED_HEIGHT - BASE_HEIGHT)
            : BASE_HEIGHT

          return (
            <li key={section.id}>
              <motion.button
                onClick={() => onSelect(index)}
                className={cn(
                  "group relative flex w-10 items-center justify-center rounded-lg font-medium transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                style={{
                  backgroundColor: section.color,
                  color: section.textColor,
                }}
                animate={{
                  height: cardHeight,
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                aria-label={`${section.title} 섹션으로 이동`}
                aria-current={isActive ? "page" : undefined}
              >
                {/* 섹션 번호 */}
                <span className="text-xs font-semibold">{sectionNumber}</span>

                {/* 활성 인디케이터 (점) */}
                {isActive && (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 25,
                    }}
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: section.textColor }}
                    />
                  </motion.span>
                )}

                {/* 호버 시 타이틀 툴팁 */}
                <span
                  className={cn(
                    "pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium",
                    "opacity-0 transition-opacity group-hover:opacity-100"
                  )}
                  style={{
                    backgroundColor: section.color,
                    color: section.textColor,
                  }}
                >
                  {section.title}
                </span>
              </motion.button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { SideNavigation }
export type { Section, SideNavigationProps }
