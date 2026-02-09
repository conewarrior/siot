"use client"

import { useState } from "react"
import Link from "next/link"
import { TagChip } from "@/components/tag-chip"
import { cn } from "@/lib/utils"

interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
}

interface BlogListProps {
  posts: BlogPost[]
  initialFilter?: string
}

const filters = [
  {
    label: "전체",
    value: "all",
    activeClass: "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100",
    inactiveClass: "border-neutral-300 text-neutral-500 hover:border-neutral-400 dark:border-neutral-600 dark:text-neutral-400 dark:hover:border-neutral-500"
  },
  {
    label: "UX",
    value: "ux",
    activeClass: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
    inactiveClass: "border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
  },
  {
    label: "디자인시스템",
    value: "디자인시스템",
    activeClass: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/40 dark:text-amber-300 dark:border-amber-700",
    inactiveClass: "border-amber-300 text-amber-600 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/20"
  },
  {
    label: "AX",
    value: "개발",
    activeClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700",
    inactiveClass: "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
  },
] as const

export function BlogList({ posts, initialFilter }: BlogListProps) {
  const [activeFilter, setActiveFilter] = useState<string>(initialFilter || "all")

  const filteredPosts =
    activeFilter === "all"
      ? posts
      : posts.filter((post) => post.category.toLowerCase() === activeFilter.toLowerCase())

  return (
    <>
      {/* Filter Chips */}
      <div className="flex gap-2 mb-10">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveFilter(filter.value)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200",
              activeFilter === filter.value
                ? filter.activeClass
                : filter.inactiveClass
            )}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Post List */}
      <div className="space-y-0">
        {filteredPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block"
          >
            <article className="py-6 border-t border-border -mx-4 px-4">
              <div className="flex items-start justify-between gap-4 mb-2">
                <h2 className="text-foreground font-medium text-lg relative after:absolute after:bg-accent after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                  {post.title}
                </h2>
                <span className="text-xs font-mono text-muted tabular-nums shrink-0 mt-1">
                  {post.date.replace(/-/g, ".")}
                </span>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-2">
                {post.description}
              </p>
              <TagChip label={post.category === "개발" ? "AX" : post.category === "디자인시스템" ? "디자인시스템" : post.category.toLowerCase() === "ux" ? "UX" : post.category} variant="category" />
            </article>
          </Link>
        ))}
        <div className="border-t border-border" />
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <p className="text-muted text-center py-12">
          해당 카테고리의 글이 없습니다.
        </p>
      )}
    </>
  )
}
