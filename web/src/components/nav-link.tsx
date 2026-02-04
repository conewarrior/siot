"use client"

import React, { ReactNode } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

interface NavLinkProps {
  href: string
  children: ReactNode
  isActive?: boolean
  className?: string
}

export function NavLink({ href, children, isActive = false, className = "" }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        relative rounded-md text-sm tracking-wide px-3 py-1.5
        transition-colors
        ${isActive ? "text-foreground" : "text-muted hover:text-foreground"}
        ${className}
      `}
    >
      <motion.span
        className="absolute inset-0 rounded-md bg-accent/20"
        initial={{ scale: 0, opacity: 0 }}
        whileHover={{ scale: 1, opacity: 1 }}
        animate={isActive ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 15,
        }}
      />
      <span className="relative z-10">{children}</span>
    </Link>
  )
}
