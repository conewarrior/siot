import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { SideProjectList } from "@/components/side-project-list"
import { ToolkitGrid } from "@/components/toolkit-grid"

export const metadata: Metadata = {
  title: "프로젝트 & 저장소",
  description: "실험하고, 만들고, 배우는 과정의 기록들.",
  openGraph: {
    title: "프로젝트 & 저장소",
    description: "실험하고, 만들고, 배우는 과정의 기록들.",
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <AnimatedText
          text="프로젝트 & 저장소"
          className="mb-4"
          textClassName="font-serif text-4xl tracking-tight"
        />
        <p className="text-muted text-lg mb-12">
          실험하고, 만들고, 배우는 과정의 기록들.
        </p>

        {/* Side Projects */}
        <div className="mb-16">
          <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-8">
            사이드 프로젝트
          </h2>
          <SideProjectList />
        </div>

        {/* Toolkit */}
        <div>
          <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-8">
            저장소
          </h2>
          <ToolkitGrid showAll />
        </div>
      </section>
    </main>
  )
}
