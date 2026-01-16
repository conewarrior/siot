"use client"

import { ArrowUpRight } from "lucide-react"

interface SideProject {
  title: string
  year: string
  link?: string
}

const projects: SideProject[] = [
  {
    title: "땅콩쨈",
    year: "2026",
    link: "https://ddangkongjam.com",
  },
  {
    title: "6to6",
    year: "2025",
    link: "https://6to6-seven.vercel.app",
  },
]

export function SideProjectList() {
  return (
    <div className="space-y-0">
      {projects.map((project, index) => {
        const Component = project.link ? "a" : "div"

        return (
          <Component
            key={project.title}
            href={project.link}
            target={project.link ? "_blank" : undefined}
            rel={project.link ? "noopener noreferrer" : undefined}
            className="group block"
          >
            <div
              className={`py-4 flex items-center justify-between gap-4 -mx-4 px-4 ${
                index === 0 ? "" : "border-t border-border"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-foreground relative after:absolute after:bg-accent after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                  {project.title}
                </span>
                {project.link && (
                  <ArrowUpRight className="w-3 h-3 text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
              <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                {project.year}
              </span>
            </div>
          </Component>
        )
      })}
      <div className="border-t border-border" />
    </div>
  )
}
