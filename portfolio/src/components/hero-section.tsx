"use client"

import { Typewriter } from "@/components/typewriter"

export function HeroSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-6">
        <Typewriter
          text={[
            "디자인은 문제 해결이다",
            "코드는 생각의 확장이다",
            "좋은 제품은 감정을 움직인다",
          ]}
          speed={80}
          deleteSpeed={40}
          waitTime={2500}
          className="font-serif"
          cursorChar="_"
          cursorClassName="text-accent ml-0.5"
        />
      </h1>
    </section>
  )
}
