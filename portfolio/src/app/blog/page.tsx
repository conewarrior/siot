import { Header } from "@/components/header"
import Link from "next/link"

const posts = [
  {
    title: "Building a Design System from Scratch",
    description: "A comprehensive guide to creating scalable design systems that grow with your product.",
    date: "2024.12.28",
    slug: "building-design-system",
    category: "Design",
  },
  {
    title: "The Art of Minimal Interfaces",
    description: "Why less is more in digital product design, and how to achieve meaningful minimalism.",
    date: "2024.12.15",
    slug: "minimal-interfaces",
    category: "Design",
  },
  {
    title: "React Server Components Deep Dive",
    description: "Understanding the new paradigm of server-first React architecture.",
    date: "2024.12.01",
    slug: "react-server-components",
    category: "Development",
  },
  {
    title: "Typography in Digital Products",
    description: "Choosing and pairing typefaces for better readability and brand expression.",
    date: "2024.11.20",
    slug: "digital-typography",
    category: "Design",
  },
  {
    title: "Building with AI APIs",
    description: "Practical patterns for integrating language models into your applications.",
    date: "2024.11.10",
    slug: "ai-apis",
    category: "Development",
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl tracking-tight mb-4">Blog</h1>
        <p className="text-muted text-lg mb-12">
          Thoughts on design, development, and building digital products.
        </p>

        <div className="space-y-0">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <article className="py-6 border-t border-border transition-colors hover:bg-secondary/30 -mx-4 px-4 rounded">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="text-foreground font-medium text-lg group-hover:underline underline-offset-4">
                    {post.title}
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
