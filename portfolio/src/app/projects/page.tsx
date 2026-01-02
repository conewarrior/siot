"use client"

import { Header } from "@/components/header"
import { ProjectShowcase } from "@/components/project-showcase"

export default function ProjectsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl tracking-tight mb-4">Projects</h1>
        <p className="text-muted text-lg mb-8">
          A selection of work spanning design systems, web applications, and creative tools.
        </p>
      </section>

      <ProjectShowcase />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-8">
          Experiments & Side Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Type Scale Generator",
              description: "A tool for creating harmonious type scales based on musical ratios.",
              tech: ["React", "TypeScript"],
            },
            {
              title: "Color Palette AI",
              description: "Generate cohesive color palettes from text descriptions.",
              tech: ["Next.js", "OpenAI"],
            },
            {
              title: "Motion Library",
              description: "Reusable animation primitives for React applications.",
              tech: ["React", "Framer Motion"],
            },
            {
              title: "Markdown Editor",
              description: "A distraction-free writing environment with live preview.",
              tech: ["Vue", "ProseMirror"],
            },
          ].map((project) => (
            <div
              key={project.title}
              className="group p-5 border border-border rounded-lg hover:border-foreground/20 hover:bg-secondary/30 transition-all cursor-pointer"
            >
              <h3 className="text-foreground font-medium mb-2 group-hover:underline underline-offset-4">
                {project.title}
              </h3>
              <p className="text-muted text-sm leading-relaxed mb-3">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-mono text-muted/70 bg-secondary px-2 py-0.5 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
