import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProjectShowcase } from "@/components/project-showcase"
import { getBlogPosts } from "@/lib/mdx"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const recentPosts = getBlogPosts().slice(0, 3)

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
              <div className="py-4 border-t border-border flex items-center justify-between gap-4 -mx-4 px-4 rounded">
                <span className="text-foreground relative">
                  {post.title}
                  <span className="absolute left-0 -bottom-0.5 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
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

      {/* Projects */}
      <ProjectShowcase />

      {/* Footer */}
      <footer className="w-full max-w-2xl mx-auto px-6 py-16">
        <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted">
          <span>&copy; 2026</span>
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
