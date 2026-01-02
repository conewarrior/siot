"use client"

import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import Link from "next/link"

const posts = [
  {
    title: "처음부터 디자인 시스템 구축하기",
    description: "제품과 함께 성장하는 확장 가능한 디자인 시스템을 만드는 종합 가이드.",
    date: "2024.12.28",
    slug: "building-design-system",
    category: "디자인",
  },
  {
    title: "미니멀 인터페이스의 예술",
    description: "디지털 제품 디자인에서 왜 적은 것이 더 많은 것인지, 그리고 의미 있는 미니멀리즘을 달성하는 방법.",
    date: "2024.12.15",
    slug: "minimal-interfaces",
    category: "디자인",
  },
  {
    title: "React 서버 컴포넌트 심층 분석",
    description: "서버 우선 React 아키텍처의 새로운 패러다임 이해하기.",
    date: "2024.12.01",
    slug: "react-server-components",
    category: "개발",
  },
  {
    title: "디지털 제품의 타이포그래피",
    description: "가독성과 브랜드 표현을 위한 서체 선택과 조합.",
    date: "2024.11.20",
    slug: "digital-typography",
    category: "디자인",
  },
  {
    title: "AI API로 개발하기",
    description: "언어 모델을 애플리케이션에 통합하기 위한 실용적인 패턴.",
    date: "2024.11.10",
    slug: "ai-apis",
    category: "개발",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <AnimatedText
          text="블로그"
          className="mb-4"
          textClassName="font-serif text-4xl tracking-tight"
        />
        <p className="text-muted text-lg mb-12">
          디자인, 개발, 디지털 제품 구축에 대한 생각들.
        </p>

        <div className="space-y-0">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="py-6 border-t border-border -mx-4 px-4 rounded">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-foreground font-medium text-lg relative">
                    {post.title}
                    <span className="absolute left-0 -bottom-0.5 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
                  </h2>
                  <span className="text-xs font-mono text-muted tabular-nums shrink-0 mt-1">
                    {post.date}
                  </span>
                </div>
                <p className="text-muted text-sm leading-relaxed mb-2">
                  {post.description}
                </p>
                <span className="text-xs text-muted/70 uppercase tracking-wide">
                  {post.category}
                </span>
              </article>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>
    </main>
  )
}
