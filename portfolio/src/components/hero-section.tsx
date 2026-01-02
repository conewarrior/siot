"use client"

import { TextRotate } from "@/components/text-rotate"
import { motion, LayoutGroup } from "framer-motion"

export function HeroSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-tight mb-6 flex flex-wrap items-center gap-2">
        <span>make it</span>
        <LayoutGroup>
          <motion.span
            layout
            transition={{ type: "spring", damping: 20, stiffness: 400 }}
            className="inline-flex bg-accent text-white px-3 py-1 rounded-lg"
          >
            <TextRotate
              texts={["pop", "snappy", "flow", "simple", "click", "yesterday", "right"]}
              mainClassName="overflow-hidden"
              staggerFrom="last"
              staggerDuration={0.02}
              rotationInterval={2500}
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
            />
          </motion.span>
        </LayoutGroup>
      </h1>
      <p className="text-muted text-lg leading-relaxed max-w-xl">
        바이브코딩으로 원하는 걸 빠르게 실현하는 디자이너
      </p>
    </section>
  )
}
