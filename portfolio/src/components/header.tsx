"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { NavLink } from "@/components/nav-link"

const navItems = [
  { href: "/", label: "홈" },
  { href: "/blog", label: "블로그" },
  { href: "/projects", label: "프로젝트" },
  { href: "/about", label: "소개" },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="w-full max-w-2xl mx-auto px-6 py-8">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="font-serif italic text-xl tracking-tight hover:opacity-70 transition-opacity"
        >
          siot
        </Link>

        <ul className="flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <NavLink href={item.href} isActive={isActive}>
                  {item.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
