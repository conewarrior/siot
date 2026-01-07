import type { Metadata } from "next"
import { Header } from "@/components/header"
import { AnimatedText } from "@/components/animated-text"
import { MDXContent } from "@/components/mdx-content"
import { getAboutContent } from "@/lib/mdx"

export const metadata: Metadata = {
  title: "소개",
  description: "4~5년 차 UX 디자이너로 초기 스타트업부터 중견기업까지 다양한 조직에서 디자인 시스템 구축 및 B2C/B2B 서비스 개선을 주도했습니다.",
  openGraph: {
    title: "소개",
    description: "4~5년 차 UX 디자이너로 초기 스타트업부터 중견기업까지 다양한 조직에서 디자인 시스템 구축 및 B2C/B2B 서비스 개선을 주도했습니다.",
  },
}

export default function AboutPage() {
  const about = getAboutContent()

  if (!about) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="w-full max-w-2xl mx-auto px-6 py-16">
          <p className="text-muted">콘텐츠를 불러올 수 없습니다.</p>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <AnimatedText
          text={about.title}
          className="mb-8"
          textClassName="font-serif text-4xl tracking-tight"
        />

        <article className="prose-custom">
          <MDXContent source={about.content} />
        </article>
      </section>
    </main>
  )
}
