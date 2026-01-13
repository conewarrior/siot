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
  onSelect: (index: number) => void
}

function SideNavigation({ sections, currentIndex, onSelect }: SideNavigationProps) {
  return (
    <nav
      className="fixed left-6 top-1/2 z-50 -translate-y-1/2"
      aria-label="섹션 내비게이션"
    >
      <ul className="flex flex-col gap-2">
        {sections.map((section, index) => {
          const isActive = currentIndex === index
          const sectionNumber = index.toString().padStart(2, "0")

          return (
            <li key={section.id}>
              <motion.button
                onClick={() => onSelect(index)}
                className={cn(
                  "group relative flex h-10 w-10 items-center justify-center rounded-lg font-medium transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
                style={{
                  backgroundColor: section.color,
                  color: section.textColor,
                }}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 20,
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
