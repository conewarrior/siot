import type { Metadata } from "next"
import { Suspense } from "react"
import { Header } from "@/components/header"
import { MDXContent } from "@/components/mdx-content"
import { getBlogPost, getBlogPosts } from "@/lib/mdx"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export function generateStaticParams() {
  const posts = getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    return { title: "글을 찾을 수 없습니다" }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />

      <article className="w-full max-w-2xl mx-auto px-6 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          블로그로 돌아가기
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-muted mb-4">
            <span className="uppercase tracking-wide">{post.category}</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{post.date.replace(/-/g, ".")}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <Suspense fallback={<div className="animate-pulse h-96 bg-secondary rounded" />}>
            <MDXContent source={post.content} />
          </Suspense>
        </div>
      </article>
    </main>
  )
}
