import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { BlogList } from "@/components/blog-list"
import { getBlogPosts } from "@/lib/mdx"

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
        <p className="text-muted text-lg mb-6">
          디자인, 개발, 디지털 제품 구축에 대한 생각들.
        </p>

        <BlogList posts={posts} />
      </section>
    </main>
  )
}
