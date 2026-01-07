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

      {/* Projects */}
      <ProjectShowcase />

      {/* Footer */}
      <footer className="w-full max-w-2xl mx-auto px-6 py-16">
        <div className="border-t border-border pt-8 flex items-center justify-between text-sm text-muted">
          <span>&copy; 2026</span>
          <div className="flex items-center gap-4">
            <a
              href="https://sixth-recap-55049847.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              포트폴리오
            </a>
            <a
              href="https://brunch.co.kr/@kimhansol30"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              블로그
            </a>
            <a
              href="mailto:kimhansol307@gmail.com"
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
