"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
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

        <ul className="flex items-center gap-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href))

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`
                    text-sm tracking-wide transition-colors relative
                    ${isActive
                      ? "text-foreground"
                      : "text-muted hover:text-foreground"
                    }
                  `}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-px bg-foreground" />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
