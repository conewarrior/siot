import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { getBlogPosts } from "@/lib/mdx"
import Link from "next/link"

export const metadata: Metadata = {
  title: "블로그",
  description: "디자인, 개발, 디지털 제품 구축에 대한 생각들.",
  openGraph: {
    title: "블로그",
    description: "디자인, 개발, 디지털 제품 구축에 대한 생각들.",
  },
}

export default function BlogPage() {
  const posts = getBlogPosts()

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
                    {post.date.replace(/-/g, ".")}
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
