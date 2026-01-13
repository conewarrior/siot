"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { TagChip } from "@/components/tag-chip"

interface SideProject {
  title: string
  description: string
  image: string
  tech: string[]
  year: string
  link?: string
}

const projects: SideProject[] = [
  {
    title: "땅콩쨈",
    description: "매일 밤 9시, 비슷한 취향의 4~5명이 모여 영화 이야기를 나누는 온라인 모임 서비스.",
    image: "/images/projects/ddangkongjam.png",
    tech: ["Next.js", "Supabase"],
    year: "2026",
    link: "https://ddangkongjam.com",
  },
  {
    title: "6to6",
    description: "황혼에서 새벽까지. 매일 밤 6시부터 새벽 6시까지만 열리는 익명 실시간 채팅.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&auto=format&fit=crop",
    tech: ["Next.js"],
    year: "2025",
    link: "https://6to6-seven.vercel.app",
  },
]

export function SideProjectGrid() {
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

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      {/* Floating image */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPosition.x + 20}px, ${smoothPosition.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0.8,
          transition: "opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1), scale 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="relative w-[280px] h-[180px] bg-secondary rounded-xl overflow-hidden">
          {projects.map((project, index) => (
            <Image
              key={project.title}
              src={project.image}
              alt={project.title}
              fill
              sizes="280px"
              className="object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? 1 : 1.1,
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent" />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project, index) => {
          const isHovered = hoveredIndex === index
          const Component = project.link ? "a" : "div"

          return (
            <Component
              key={project.title}
              href={project.link}
              target={project.link ? "_blank" : undefined}
              rel={project.link ? "noopener noreferrer" : undefined}
              className="group p-5 rounded-xl border border-border bg-secondary/30 transition-all duration-300 hover:border-foreground/20 hover:bg-secondary/50"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground font-medium relative inline-block">
                    {project.title}
                    <span
                      className={`absolute left-0 -bottom-0.5 h-0.5 bg-accent transition-all duration-300 ease-out ${
                        isHovered ? "w-full" : "w-0"
                      }`}
                    />
                  </h3>
                  {project.link && (
                    <ArrowUpRight
                      className={`w-4 h-4 text-muted flex-shrink-0 transition-all duration-300 ${
                        isHovered ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1"
                      }`}
                    />
                  )}
                </div>
                <span className="text-xs font-mono text-muted tabular-nums flex-shrink-0">
                  {project.year}
                </span>
              </div>

              <p className="text-muted text-sm leading-relaxed mt-2 mb-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <TagChip key={tech} label={tech} variant="tech" />
                ))}
              </div>
            </Component>
          )
        })}
      </div>
    </div>
  )
}
