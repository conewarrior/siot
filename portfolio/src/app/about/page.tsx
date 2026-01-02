import { Header } from "@/components/header"
import { ArrowUpRight } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <h1 className="font-serif text-4xl tracking-tight mb-8">About</h1>

        <div className="space-y-6 text-muted leading-relaxed">
          <p>
            I&apos;m a developer and designer based in Seoul, focused on building
            thoughtful digital products that balance aesthetics with functionality.
          </p>

          <p>
            Currently exploring the intersection of AI and creative tools—thinking
            about how we can use language models to augment rather than replace
            human creativity.
          </p>

          <p>
            Previously, I&apos;ve worked on design systems, web applications, and
            developer tools at various startups. I believe in shipping early,
            iterating often, and learning from real users.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          <div>
            <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-6">
              Experience
            </h2>
            <div className="space-y-6">
              {[
                {
                  role: "Senior Developer",
                  company: "Current Company",
                  period: "2023 — Present",
                },
                {
                  role: "Full-Stack Developer",
                  company: "Previous Startup",
                  period: "2021 — 2023",
                },
                {
                  role: "Frontend Developer",
                  company: "First Job",
                  period: "2019 — 2021",
                },
              ].map((job) => (
                <div
                  key={job.company}
                  className="flex items-start justify-between gap-4"
                >
                  <div>
                    <h3 className="text-foreground font-medium">{job.role}</h3>
                    <p className="text-muted text-sm">{job.company}</p>
                  </div>
                  <span className="text-xs font-mono text-muted tabular-nums shrink-0">
                    {job.period}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-6">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {[
                "TypeScript",
                "React",
                "Next.js",
                "Node.js",
                "Python",
                "Figma",
                "Tailwind CSS",
                "PostgreSQL",
                "GraphQL",
              ].map((skill) => (
                <span
                  key={skill}
                  className="text-sm text-muted border border-border px-3 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-muted text-sm font-medium tracking-wide uppercase mb-6">
              Connect
            </h2>
            <div className="space-y-3">
              {[
                { label: "Email", href: "mailto:hello@example.com", value: "hello@example.com" },
                { label: "GitHub", href: "https://github.com", value: "github.com/username" },
                { label: "Twitter", href: "https://twitter.com", value: "@username" },
                { label: "LinkedIn", href: "https://linkedin.com", value: "linkedin.com/in/username" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  className="flex items-center justify-between group"
                >
                  <span className="text-muted text-sm">{link.label}</span>
                  <span className="text-foreground text-sm flex items-center gap-1 group-hover:underline underline-offset-4">
                    {link.value}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
