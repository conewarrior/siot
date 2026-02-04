"use client"

import { ArrowUpRight } from "lucide-react"
import Image from "next/image"

interface SideProject {
  title: string
  description: string
  year: string
  link?: string
  image: string
}

const projects: SideProject[] = [
  {
    title: "Design System",
    description: "사내 AX 조직을 위한 양방향 동기 자동화 디자인 시스템",
    year: "2026",
    link: "https://docs-ashy-five.vercel.app/",
    image: "/images/side-projects/design-system.png",
  },
  {
    title: "Claude Toolkit",
    description: "Claude Code용 스킬, 커맨드, 에이전트 마켓플레이스",
    year: "2026",
    link: "https://github.com/conewarrior/siot-claude-toolkit",
    image: "/images/side-projects/claude-toolkit.png",
  },
  {
    title: "땅콩쨈",
    description: "취향 기반 영화 토론 모임 매칭 서비스",
    year: "2025",
    link: "https://ddangkongjam.com",
    image: "/images/side-projects/ddangkongjam.png",
  },
  {
    title: "6to6",
    description: "새벽 6시부터 저녁 6시까지만 열리는 익명 채팅",
    year: "2025",
    link: "https://6to6-seven.vercel.app",
    image: "/images/side-projects/6to6.png",
  },
  {
    title: "Parkingon",
    description: "아파트 단지 주차 시설 통합 관리 플랫폼 대시보드 퍼블리싱",
    year: "2025",
    link: "https://parkingon-client.vercel.app/dashboard",
    image: "/images/side-projects/parkingon.png",
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
            className={`group flex gap-4 py-4 -mx-4 px-4 ${index === 0 ? "" : "border-t border-border"}`}
          >
            <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0 border border-black/10 dark:border-white/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="128px"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-foreground font-medium relative after:absolute after:bg-accent after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                  {project.title}
                </span>
                {project.link && (
                  <ArrowUpRight className="w-3 h-3 text-muted" />
                )}
                <span className="text-xs font-mono text-muted tabular-nums ml-auto">
                  {project.year}
                </span>
              </div>
              <p className="text-sm text-muted truncate">{project.description}</p>
            </div>
          </Component>
        )
      })}
    </div>
  )
}
