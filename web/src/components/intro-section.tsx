"use client"

import { HyperTextParagraph } from "@/components/ui/hyper-text-with-decryption"

export function IntroSection() {
  const lines = [
    { text: "사용자 경험을 설계합니다.", highlights: [] },
    { text: "AI로 효율을, 데이터로 근거를,", highlights: [
      { word: "AI로", href: "/blog?filter=개발" },
      { word: "데이터로", href: "/blog?filter=UX" },
    ]},
    { text: "시스템으로 일관성을.", highlights: [
      { word: "시스템으로", href: "/blog?filter=디자인시스템" },
    ]},
  ]

  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-16 overflow-visible">
      <div className="space-y-1">
        {lines.map((line, i) => (
          <HyperTextParagraph
            key={i}
            text={line.text}
            highlightWords={line.highlights}
            className="text-3xl md:text-4xl text-foreground font-normal"
          />
        ))}
      </div>
    </section>
  )
}
