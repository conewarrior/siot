import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { SideProjectList } from "@/components/side-project-list"
import { ToolkitGrid } from "@/components/toolkit-grid"

export const metadata: Metadata = {
  title: "프로젝트",
  description: "사이드 프로젝트와 Claude Code 저장소 모음.",
  openGraph: {
    title: "프로젝트",
    description: "사이드 프로젝트와 Claude Code 저장소 모음.",
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Side Projects */}
      <section className="w-full max-w-2xl mx-auto px-6 pt-16 pb-12">
        <AnimatedText
          text="사이드 프로젝트"
          className="mb-4"
          textClassName="font-serif text-4xl tracking-tight"
        />
        <p className="text-muted text-lg mb-6">
          실험하고, 만들고, 배우는 과정의 기록들.
        </p>
        <SideProjectList />
      </section>

      {/* Toolkit */}
      <section className="w-full max-w-2xl mx-auto px-6 py-12">
        <AnimatedText
          text="저장소"
          className="mb-4"
          textClassName="font-serif text-4xl tracking-tight"
        />
        <p className="text-muted text-lg mb-6">
          Claude Code를 위한 커맨드, 스킬, 에이전트 모음.
        </p>
        <ToolkitGrid showAll showFilter />
      </section>
    </main>
  )
}
