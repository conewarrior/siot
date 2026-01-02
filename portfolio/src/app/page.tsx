import { Header } from "@/components/header"
import { ProjectShowcase } from "@/components/project-showcase"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const recentPosts = [
  {
    title: "Building a Design System from Scratch",
    date: "2024.12.28",
    slug: "building-design-system",
  },
  {
    title: "The Art of Minimal Interfaces",
    date: "2024.12.15",
    slug: "minimal-interfaces",
  },
  {
    title: "React Server Components Deep Dive",
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
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-6">
          Developer &{" "}
          <span className="italic">Designer</span>
        </h1>
        <p className="text-muted text-lg leading-relaxed max-w-xl">
          Building thoughtful digital experiences with code and design.
          Currently exploring the intersection of AI and creative tools.
        </p>
      </section>

      {/* Recent Posts */}
      <section className="w-full max-w-2xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-muted text-sm font-medium tracking-wide uppercase">
            Recent Writing
          </h2>
          <Link
            href="/blog"
            className="text-sm text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            View all
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
              <div className="py-4 border-t border-border flex items-center justify-between gap-4 transition-colors hover:bg-secondary/30 -mx-4 px-4 rounded">
                <span className="text-foreground group-hover:underline underline-offset-4">
                  {post.title}
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
              GitHub
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Twitter
            </a>
            <a
              href="mailto:hello@example.com"
              className="hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  )
}
