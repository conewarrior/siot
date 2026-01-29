"use client"

import { HyperTextParagraph } from "@/components/ui/hyper-text-with-decryption"

export function IntroSection() {
  const intro = "사용자 경험을 설계합니다. AI로 효율을, 데이터로 근거를, 시스템으로 일관성을."

  const highlights = [
    { word: "AI로", href: "/blog?filter=개발" },
    { word: "효율을,", href: "/blog?filter=개발" },
    { word: "데이터로", href: "/blog?filter=UX" },
    { word: "근거를,", href: "/blog?filter=UX" },
    { word: "시스템으로", href: "/blog?filter=디자인시스템" },
    { word: "일관성을.", href: "/blog?filter=디자인시스템" },
  ]

  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-16">
      <HyperTextParagraph
        text={intro}
        highlightWords={highlights}
        className="text-2xl md:text-3xl text-foreground font-normal leading-relaxed"
      />
    </section>
  )
}
