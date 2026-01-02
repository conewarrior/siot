"use client"

import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { ArrowUpRight } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <AnimatedText
          text="소개"
          className="mb-8"
          textClassName="font-serif text-4xl tracking-tight"
        />

        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            서울에 거주하는 개발자이자 디자이너입니다. 심미성과 기능성의
            균형을 갖춘 디지털 제품을 만드는 데 집중하고 있습니다.
          </p>

          <p>
            현재 AI와 창작 도구의 교차점을 탐구하고 있습니다. 언어 모델이
            인간의 창의성을 대체하기보다 어떻게 증강할 수 있을지 고민하고 있습니다.
          </p>

          <p>
            그동안 여러 스타트업에서 디자인 시스템, 웹 애플리케이션, 개발자 도구
            작업을 해왔습니다. 빠르게 출시하고, 자주 개선하며, 실제 사용자로부터
            배우는 것을 중요하게 생각합니다.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-6">
              경력
            </h2>
            <div className="space-y-6">
              {[
                {
                  role: "시니어 개발자",
                  company: "현재 회사",
                  period: "2023 — 현재",
                },
                {
                  role: "풀스택 개발자",
                  company: "이전 스타트업",
                  period: "2021 — 2023",
                },
                {
                  role: "프론트엔드 개발자",
                  company: "첫 직장",
                  period: "2019 — 2021",
                },
              ].map((job) => (
                <div
                  key={job.company}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="text-foreground font-medium">{job.role}</h3>
                    <p className="text-muted text-sm">{job.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                    {job.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-6">
              기술 스택
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "Figma",
                "Tailwind CSS",
                "PostgreSQL",
                "GraphQL",
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-muted border border-border px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-6">
              연락처
            </h2>
            <div className="space-y-3">
              {[
                { label: "이메일", href: "mailto:hello@example.com", value: "hello@example.com" },
                { label: "깃허브", href: "https://github.com", value: "github.com/username" },
                { label: "트위터", href: "https://twitter.com", value: "@username" },
                { label: "링크드인", href: "https://linkedin.com", value: "linkedin.com/in/username" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex items-center justify-between group"
                >
                  <span className="text-muted text-sm">{link.label}</span>
                  <span className="text-foreground text-sm flex items-center gap-1 relative">
                    {link.value}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="absolute left-0 -bottom-0.5 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
