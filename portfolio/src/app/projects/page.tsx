import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { SideProjectGrid } from "@/components/side-project-grid"

export const metadata: Metadata = {
  title: "사이드 프로젝트",
  description: "실험하고, 만들고, 배우는 과정의 기록들.",
  openGraph: {
    title: "사이드 프로젝트",
    description: "실험하고, 만들고, 배우는 과정의 기록들.",
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <AnimatedText
          text="사이드 프로젝트"
          className="mb-4"
          textClassName="font-serif text-4xl tracking-tight"
        />
        <p className="text-muted text-lg mb-12">
          실험하고, 만들고, 배우는 과정의 기록들.
        </p>

        <SideProjectGrid />
      </section>
    </main>
  )
}
