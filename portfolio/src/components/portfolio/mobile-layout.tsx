"use client"

import { useState, useEffect, useCallback, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import type { PortfolioSection } from "@/lib/portfolio-mdx"
import { ChevronDown } from "lucide-react"

// useMediaQuery 훅 - SSR에서는 기본값 사용, 클라이언트에서는 미디어 쿼리 결과 반환
function useMediaQuery(query: string): boolean {
  // 클라이언트에서 초기값을 계산 (SSR에서는 항상 false)
  const getInitialValue = () => {
    if (typeof window === "undefined") return false
    return window.matchMedia(query).matches
  }

  const [matches, setMatches] = useState(getInitialValue)

  useEffect(() => {
    if (typeof window === "undefined") return

    const mediaQuery = window.matchMedia(query)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener("change", handler)
    return () => mediaQuery.removeEventListener("change", handler)
  }, [query])

  return matches
}

interface MobileLayoutProps {
  sections: PortfolioSection[]
  children?: ReactNode
}

/**
 * 모바일 반응형 레이아웃 컴포넌트
 * - 모바일 (< 768px): 세로 스크롤로 모든 섹션 표시
 * - 데스크톱 (>= 768px): children 그대로 렌더링
 */
export function MobileLayout({ sections, children }: MobileLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [currentSection, setCurrentSection] = useState(0)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // 스크롤 시 현재 섹션 감지
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return

    const sectionElements = document.querySelectorAll("[data-section-index]")
    const scrollPosition = window.scrollY + window.innerHeight / 3

    sectionElements.forEach((element) => {
      const htmlElement = element as HTMLElement
      const sectionIndex = parseInt(htmlElement.dataset.sectionIndex || "0", 10)
      const rect = htmlElement.getBoundingClientRect()
      const elementTop = rect.top + window.scrollY

      if (scrollPosition >= elementTop && scrollPosition < elementTop + rect.height) {
        setCurrentSection(sectionIndex)
      }
    })
  }, [])

  useEffect(() => {
    if (isDesktop) return

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // 초기 체크

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDesktop, handleScroll])

  // 섹션으로 스크롤
  const scrollToSection = (index: number) => {
    const element = document.querySelector(`[data-section-index="${index}"]`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsDropdownOpen(false)
    }
  }

  // 데스크톱: children 그대로 렌더링
  if (isDesktop) {
    return <>{children}</>
  }

  // 모바일: 세로 스크롤 레이아웃
  return (
    <div className="min-h-screen bg-background">
      {/* 상단 고정 섹션 네비게이션 */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="px-4 py-3">
          {/* 드롭다운 섹션 선택 */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={cn(
                "flex w-full items-center justify-between gap-2 rounded-lg px-4 py-2",
                "bg-secondary/50 text-foreground",
                "transition-colors hover:bg-secondary"
              )}
              aria-expanded={isDropdownOpen}
              aria-haspopup="listbox"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: sections[currentSection]?.color }}
                />
                <span className="text-sm font-medium">
                  {sections[currentSection]?.title || "섹션 선택"}
                </span>
              </div>
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </button>

            {/* 드롭다운 메뉴 */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    "absolute top-full left-0 right-0 mt-2",
                    "rounded-lg border border-border bg-background shadow-lg",
                    "overflow-hidden"
                  )}
                  role="listbox"
                >
                  {sections.map((section, index) => (
                    <li key={section.slug}>
                      <button
                        onClick={() => scrollToSection(index)}
                        className={cn(
                          "flex w-full items-center gap-3 px-4 py-3",
                          "transition-colors hover:bg-secondary/50",
                          currentSection === index && "bg-secondary"
                        )}
                        role="option"
                        aria-selected={currentSection === index}
                      >
                        <span
                          className="h-3 w-3 rounded-full shrink-0"
                          style={{ backgroundColor: section.color }}
                        />
                        <span className="text-sm">{section.title}</span>
                        <span className="ml-auto text-xs text-muted">
                          {section.slides.length} slides
                        </span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          {/* 현재 섹션 인디케이터 */}
          <div className="mt-2 flex items-center gap-1.5">
            {sections.map((section, index) => (
              <button
                key={section.slug}
                onClick={() => scrollToSection(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  currentSection === index ? "w-6" : "w-1.5"
                )}
                style={{
                  backgroundColor:
                    currentSection === index
                      ? section.color
                      : "var(--color-muted)",
                }}
                aria-label={`${section.title} 섹션으로 이동`}
              />
            ))}
          </div>
        </div>
      </nav>

      {/* 세로 스크롤 슬라이드 컨텐츠 */}
      <main className="pt-24 pb-12">
        {sections.map((section, sectionIndex) => (
          <section
            key={section.slug}
            data-section-index={sectionIndex}
            className="scroll-mt-24"
          >
            {/* 섹션 헤더 */}
            <div
              className="sticky top-[88px] z-40 px-4 py-3 border-b border-border"
              style={{
                backgroundColor: section.color,
                color: section.textColor,
              }}
            >
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">{section.title}</h2>
                <span className="text-xs opacity-80">
                  {sectionIndex + 1} / {sections.length}
                </span>
              </div>
            </div>

            {/* 슬라이드들 */}
            <div className="divide-y divide-border">
              {section.slides.map((slide, slideIndex) => (
                <article
                  key={`${section.slug}-${slideIndex}`}
                  className="px-4 py-8"
                >
                  {/* 슬라이드 타입 배지 */}
                  <span
                    className="inline-block mb-3 rounded-full px-3 py-1 text-xs font-medium"
                    style={{
                      backgroundColor: section.color,
                      color: section.textColor,
                    }}
                  >
                    {slide.type.toUpperCase()}
                  </span>

                  {/* 슬라이드 제목 */}
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {slide.title}
                  </h3>

                  {/* 섹션 제목 (cover가 아닐 때만) */}
                  {slide.type !== "cover" && (
                    <p className="text-sm text-muted">{section.title}</p>
                  )}
                </article>
              ))}
            </div>

            {/* 섹션 간 구분 */}
            {sectionIndex < sections.length - 1 && (
              <div className="h-8 bg-secondary/30" />
            )}
          </section>
        ))}
      </main>

      {/* 하단 고정 페이지 인디케이터 */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-2 rounded-full bg-background/80 backdrop-blur-sm border border-border px-4 py-2 shadow-lg">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: sections[currentSection]?.color }}
          />
          <span className="text-xs text-muted tabular-nums">
            {String(currentSection + 1).padStart(2, "0")} /{" "}
            {String(sections.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  )
}

export { useMediaQuery }
