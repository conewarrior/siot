import type { Metadata } from "next"
import { Header } from "@/components/header"
import { ProjectShowcase } from "@/components/project-showcase"
import { AnimatedText } from "@/components/animated-text"

export const metadata: Metadata = {
  title: "프로젝트",
  description: "디자인 시스템, 웹 애플리케이션, 창작 도구를 아우르는 작업들.",
  openGraph: {
    title: "프로젝트",
    description: "디자인 시스템, 웹 애플리케이션, 창작 도구를 아우르는 작업들.",
  },
}

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <AnimatedText
          text="프로젝트"
          className="mb-4"
          textClassName="font-serif text-4xl tracking-tight"
        />
        <p className="text-muted text-lg mb-8">
          디자인 시스템, 웹 애플리케이션, 창작 도구를 아우르는 작업들.
        </p>
      </section>

      <ProjectShowcase />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-8">
          실험 & 사이드 프로젝트
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "타입 스케일 생성기",
              description: "음악적 비율을 기반으로 조화로운 타입 스케일을 만드는 도구.",
              tech: ["React", "TypeScript"],
            },
            {
              title: "컬러 팔레트 AI",
              description: "텍스트 설명으로부터 일관된 컬러 팔레트를 생성.",
              tech: ["Next.js", "OpenAI"],
            },
            {
              title: "모션 라이브러리",
              description: "React 애플리케이션을 위한 재사용 가능한 애니메이션 프리미티브.",
              tech: ["React", "Framer Motion"],
            },
            {
              title: "마크다운 에디터",
              description: "실시간 미리보기가 가능한 집중형 글쓰기 환경.",
              tech: ["Vue", "ProseMirror"],
            },
          ].map((project) => (
            <div
              key={project.title}
              className="group p-5 border border-border rounded-lg hover:border-foreground/20 transition-all cursor-pointer"
            >
              <h3 className="text-foreground font-medium relative inline-block">
                {project.title}
                <span className="absolute left-0 -bottom-0.5 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-3 mt-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-muted/70 bg-secondary px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
