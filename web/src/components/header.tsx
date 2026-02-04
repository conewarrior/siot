"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { TextRotate } from "@/components/text-rotate"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, LayoutGroup, AnimatePresence } from "framer-motion"
import { Menu, X, Monitor } from "lucide-react"

const navItems = [
  { href: "/", label: "홈" },
  { href: "/blog", label: "블로그" },
  { href: "/projects", label: "프로젝트" },
  { href: "/portfolio", label: "포트폴리오", newTab: true, desktopOnly: true },
] as const

export function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showPortfolioModal, setShowPortfolioModal] = useState(false)

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="w-full max-w-2xl mx-auto px-6 py-8">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-base md:text-lg tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1 md:gap-1.5"
        >
          <span>hansol makes it</span>
          <LayoutGroup>
            <motion.span
              layout
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
              className="inline-flex bg-accent text-white px-1.5 py-0.5 rounded"
            >
              <TextRotate
                texts={["pop", "snappy", "flow", "simple", "click", "yesterday", "right"]}
                mainClassName="overflow-hidden"
                staggerFrom="last"
                staggerDuration={0.02}
                rotationInterval={2500}
                transition={{ type: "spring", damping: 20, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </Link>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                {...("newTab" in item && item.newTab
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`
                  relative rounded-md px-3 py-1.5 text-sm font-medium
                  text-foreground outline-ring transition-all duration-200
                  focus-visible:outline-2
                  ${isActive(item.href) ? "" : "hover:bg-foreground/10 dark:hover:bg-white/20"}
                `}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-bubble"
                    className="absolute inset-0 -z-10 bg-foreground/10 dark:bg-white/15"
                    style={{ borderRadius: 6 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
                {"newTab" in item && item.newTab && (
                  <span className="ml-1 text-[10px] opacity-50">↗</span>
                )}
              </Link>
            ))}
          </div>

          <ThemeToggle />

          {/* 모바일 햄버거 메뉴 버튼 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-foreground/10 transition-colors"
            aria-label="메뉴 열기"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* 모바일 메뉴 오버레이 */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden"
          >
            <div className="pt-4 pb-2 space-y-1">
              {navItems.map((item) => {
                // 모바일에서 포트폴리오는 모달로 안내
                if ("desktopOnly" in item && item.desktopOnly) {
                  return (
                    <button
                      key={item.href}
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setShowPortfolioModal(true)
                      }}
                      className="w-full text-left block px-3 py-2.5 rounded-md text-sm font-medium transition-colors text-muted hover:text-foreground hover:bg-foreground/5"
                    >
                      {item.label}
                      <span className="ml-1 text-[10px] opacity-50">↗</span>
                    </button>
                  )
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    {...("newTab" in item && item.newTab
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`
                      block px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                      ${isActive(item.href)
                        ? "bg-foreground/10 text-foreground"
                        : "text-muted hover:text-foreground hover:bg-foreground/5"}
                    `}
                  >
                    {item.label}
                    {"newTab" in item && item.newTab && (
                      <span className="ml-1 text-[10px] opacity-50">↗</span>
                    )}
                  </Link>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 포트폴리오 데스크탑 전용 안내 모달 */}
      <AnimatePresence>
        {showPortfolioModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6"
            onClick={() => setShowPortfolioModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-sm rounded-2xl bg-background p-6 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
                  <Monitor className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    데스크탑에서 확인해주세요
                  </h3>
                  <p className="mt-2 text-sm text-muted">
                    포트폴리오는 더 나은 경험을 위해<br />
                    데스크탑 환경에 최적화되어 있습니다.
                  </p>
                </div>
                <button
                  onClick={() => setShowPortfolioModal(false)}
                  className="mt-2 w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent/90"
                >
                  확인
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
