"use client"

import { useState, useRef, useEffect } from "react"
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
}

export function ToolkitGrid({ items, showAll = false }: ToolkitGridProps) {
  const displayItems = items ?? (showAll ? toolkitItems : getRecentToolkitItems(6))

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    const lerp = (start: number, end: number, factor: number) => {
      return start + (end - start) * factor
    }

    const animate = () => {
      setSmoothPosition((prev) => ({
        x: lerp(prev.x, mousePosition.x, 0.15),
        y: lerp(prev.y, mousePosition.y, 0.15),
      }))
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [mousePosition])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }
  }

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
    setIsVisible(false)
  }

  const hoveredItem = hoveredIndex !== null ? displayItems[hoveredIndex] : null

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      {/* Floating emoji icon */}
      <div
        className="pointer-events-none fixed z-50 flex items-center justify-center rounded-2xl bg-secondary/90 backdrop-blur-sm shadow-2xl border border-border"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 60}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition:
            "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          width: "100px",
          height: "100px",
        }}
      >
        <span className="text-5xl">{hoveredItem?.icon}</span>
      </div>

      {/* Grid */}
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
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
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
