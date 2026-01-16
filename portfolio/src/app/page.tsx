import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SideProjectGrid } from "@/components/side-project-grid"
import { getBlogPosts } from "@/lib/mdx"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 5)

  return (
    <main className="min-h-screen">
      <Header />

      <HeroSection />

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
              <div className="py-4 border-t border-border flex items-center justify-between gap-4 -mx-4 px-4">
                <span className="text-foreground relative after:absolute after:bg-accent after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 group-hover:after:origin-bottom-left group-hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
                  {post.title}
                </span>
                <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                  {post.date.replace(/-/g, ".")}
                </span>
              </div>
            </Link>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* Side Projects */}
      <section className="w-full max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-muted text-sm font-medium tracking-wide uppercase">
            사이드 프로젝트
          </h2>
          <Link
            href="/projects"
            className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            전체 보기
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>

        <SideProjectGrid />
      </section>

      {/* Career */}
      <section className="w-full max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-8">
          경력
        </h2>

        <div className="space-y-0">
          {[
            { company: "지니파이", period: "2025.08 —" },
            { company: "데이원컴퍼니", period: "2023.10 — 2024.09" },
            { company: "셀렉트스타", period: "2020.02 — 2023.07" },
            { company: "디싸이너", period: "2019.02 — 2019.12" },
          ].map((career, index) => (
            <div
              key={career.company}
              className={`py-4 flex items-center justify-between gap-4 ${index === 0 ? "" : "border-t border-border"}`}
            >
              <span className="text-foreground">{career.company}</span>
              <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                {career.period}
              </span>
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-2xl mx-auto px-6 py-16">
        <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted">
          <span>&copy; 2026</span>
          <a
            href="mailto:kimhansol307@gmail.com"
            className="underline underline-offset-4 hover:text-foreground transition-colors"
          >
            kimhansol307@gmail.com
          </a>
        </div>
      </footer>
    </main>
  )
}
