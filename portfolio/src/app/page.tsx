"use client"

import { Header } from "@/components/header"
import { ProjectShowcase } from "@/components/project-showcase"
import { TextRotate } from "@/components/text-rotate"
import { AnimatedText } from "@/components/animated-text"
import { motion, LayoutGroup } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const recentPosts = [
  {
    title: "처음부터 디자인 시스템 구축하기",
    date: "2024.12.28",
    slug: "building-design-system",
  },
  {
    title: "미니멀 인터페이스의 예술",
    date: "2024.12.15",
    slug: "minimal-interfaces",
  },
  {
    title: "React 서버 컴포넌트 심층 분석",
    date: "2024.12.01",
    slug: "react-server-components",
  },
]

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-6 flex flex-wrap items-center gap-2">
          <span>make it</span>
          <LayoutGroup>
            <motion.span
              layout
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
              className="inline-flex bg-accent text-white px-3 py-1 rounded-lg"
            >
              <TextRotate
                texts={["pop", "snappy", "flow", "simple", "click", "yesterday", "right"]}
                mainClassName="overflow-hidden"
                staggerFrom="last"
                staggerDuration={0.02}
                rotationInterval={2500}
                transition={{ type: "spring", damping: 20, stiffness: 400 }}
              />
            </motion.span>
          </LayoutGroup>
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-xl">
          바이브코딩으로 원하는 걸 빠르게 실현하는 디자이너
        </p>
      </section>

      {/* Recent Posts */}
      <section className="w-full max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-muted text-sm font-medium tracking-wide uppercase">
            최근 글
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            전체 보기
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-0">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="py-4 border-t border-border flex items-center justify-between gap-4 -mx-4 px-4 rounded">
                <span className="text-foreground relative">
                  {post.title}
                  <span className="absolute left-0 -bottom-0.5 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
                </span>
                <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                  {post.date}
                </span>
              </div>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* Projects */}
      <ProjectShowcase />

      {/* Footer */}
      <footer className="w-full max-w-2xl mx-auto px-6 py-16">
        <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted">
          <span>&copy; 2024</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              깃허브
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              트위터
            </a>
            <a
              href="mailto:hello@example.com"
              className="hover:text-foreground transition-colors"
            >
              이메일
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
