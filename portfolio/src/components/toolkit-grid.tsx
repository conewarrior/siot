"use client"

import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  type ToolkitItem,
  toolkitItems,
  typeColors,
  typeLabels,
  getRecentToolkitItems,
} from "@/lib/toolkit-data"

interface ToolkitGridProps {
  items?: ToolkitItem[]
  showAll?: boolean
  showFilter?: boolean
}

const filters = [
  {
    label: "전체",
    value: "all",
    activeClass: "bg-neutral-900 text-white border-neutral-900 dark:bg-neutral-100 dark:text-neutral-900 dark:border-neutral-100",
    inactiveClass: "border-neutral-300 text-neutral-500 hover:border-neutral-400 dark:border-neutral-600 dark:text-neutral-400 dark:hover:border-neutral-500"
  },
  {
    label: "command",
    value: "command",
    activeClass: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:border-blue-700",
    inactiveClass: "border-blue-300 text-blue-600 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/20"
  },
  {
    label: "skill",
    value: "skill",
    activeClass: "bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-900/40 dark:text-violet-300 dark:border-violet-700",
    inactiveClass: "border-violet-300 text-violet-600 hover:bg-violet-50 dark:border-violet-700 dark:text-violet-400 dark:hover:bg-violet-900/20"
  },
  {
    label: "agent",
    value: "agent",
    activeClass: "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/40 dark:text-emerald-300 dark:border-emerald-700",
    inactiveClass: "border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-400 dark:hover:bg-emerald-900/20"
  },
] as const

export function ToolkitGrid({ items, showAll = false, showFilter = false }: ToolkitGridProps) {
  const baseItems = items ?? (showAll ? toolkitItems : getRecentToolkitItems(6))
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeFilter, setActiveFilter] = useState<string>("all")

  const displayItems = activeFilter === "all"
    ? baseItems
    : baseItems.filter((item) => item.type === activeFilter)

  return (
    <div>
      {showFilter && (
        <div className="flex gap-2 mb-6">
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
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {displayItems.map((item, index) => {
        const isHovered = hoveredIndex === index
        const Component = item.link ? "a" : "div"

        return (
          <Component
            key={item.slug}
            href={item.link}
            target={item.link ? "_blank" : undefined}
            rel={item.link ? "noopener noreferrer" : undefined}
            className="group p-5 rounded-xl border border-border bg-secondary/30 transition-all duration-300 hover:border-foreground/20 hover:bg-secondary/50"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium",
                    typeColors[item.type]
                  )}
                >
                  {typeLabels[item.type]}
                </span>
              </div>
              <span className="text-xs font-mono text-muted tabular-nums flex-shrink-0">
                {item.year}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <h3 className="text-foreground font-medium relative inline-block font-mono">
                {item.name}
                <span
                  className={`absolute left-0 -bottom-0.5 h-0.5 bg-accent transition-all duration-300 ease-out ${
                    isHovered ? "w-full" : "w-0"
                  }`}
                />
              </h3>
              {item.link && (
                <ArrowUpRight
                  className={`w-4 h-4 text-muted flex-shrink-0 transition-all duration-300 ${
                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                  }`}
                />
              )}
            </div>

            <p className="text-muted text-sm leading-relaxed mt-2">{item.description}</p>
          </Component>
        )
      })}
      </div>
    </div>
  )
}
