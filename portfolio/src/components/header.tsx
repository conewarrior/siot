"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { TextRotate } from "@/components/text-rotate"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion, LayoutGroup } from "framer-motion"

const navItems = [
  { href: "/", label: "홈" },
  { href: "/blog", label: "블로그" },
  { href: "/projects", label: "프로젝트" },
  { href: "/about", label: "소개" },
]

export function Header() {
  const pathname = usePathname()

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname.startsWith(href)
  }

  return (
    <header className="w-full max-w-2xl mx-auto px-6 py-8">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="font-serif text-lg tracking-tight hover:opacity-70 transition-opacity flex items-center gap-1.5"
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
          <div className="flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  relative rounded-md px-3 py-1.5 text-sm font-medium
                  text-foreground outline-ring transition
                  focus-visible:outline-2
                  ${isActive(item.href) ? "" : "hover:text-foreground/60"}
                `}
                style={{ WebkitTapHighlightColor: "transparent" }}
              >
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-bubble"
                    className="absolute inset-0 -z-10 bg-secondary"
                    style={{ borderRadius: 6 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {item.label}
              </Link>
            ))}
          </div>

          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
