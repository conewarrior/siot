import { Header } from "@/components/header"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

const posts: Record<string, {
  title: string
  date: string
  category: string
  content: string
}> = {
  "building-design-system": {
    title: "Building a Design System from Scratch",
    date: "2024.12.28",
    category: "Design",
    content: `
A design system is more than just a component library. It's a living document that captures the visual language, interaction patterns, and design principles of your product.

## Why Build a Design System?

When your team grows beyond a handful of people, consistency becomes a challenge. Without a shared foundation, every designer and developer makes slightly different decisions, leading to a fragmented user experience.

A well-crafted design system provides:

- **Consistency** across all touchpoints
- **Efficiency** through reusable components
- **Scalability** as your product grows
- **Shared vocabulary** between design and development

## Starting Small

The biggest mistake teams make is trying to build everything at once. Start with the basics:

1. **Color palette** - Define your primary, secondary, and semantic colors
2. **Typography** - Choose your type scale and font families
3. **Spacing** - Create a consistent spacing system
4. **Components** - Build the most commonly used UI elements

## Documentation is Key

A design system without documentation is just a folder of components. Document not just *what* each element is, but *when* and *how* to use it.

Good documentation includes:
- Usage guidelines
- Do's and don'ts
- Code examples
- Accessibility considerations

## Evolving Over Time

Your design system will never be "done." It should evolve with your product, incorporating feedback from the team and learnings from user research.

The goal isn't perfection—it's progress.
    `.trim(),
  },
  "minimal-interfaces": {
    title: "The Art of Minimal Interfaces",
    date: "2024.12.15",
    category: "Design",
    content: `
Minimalism in design isn't about removing things until there's nothing left. It's about intentionally choosing what deserves attention and stripping away everything that doesn't serve the user.

## The Paradox of Choice

Studies show that more options often lead to worse decisions and lower satisfaction. By reducing visual noise and limiting choices, we help users focus on what matters.

## Visual Hierarchy

In a minimal interface, every element must earn its place. This forces us to think carefully about hierarchy:

- What's the primary action?
- What information is essential vs. supplementary?
- How do we guide the user's eye?

## Breathing Room

White space isn't empty space—it's active. It creates rhythm, establishes relationships between elements, and gives the eye a place to rest.

Generous margins and padding signal quality and confidence. Cramped layouts feel anxious and overwhelming.

## The Details

When there's less to look at, what remains must be perfect. Typography, alignment, color—every detail is magnified under the lens of minimalism.

This is what separates good minimal design from lazy design. Minimal doesn't mean easy.
    `.trim(),
  },
  "react-server-components": {
    title: "React Server Components Deep Dive",
    date: "2024.12.01",
    category: "Development",
    content: `
React Server Components represent a fundamental shift in how we think about React applications. Instead of sending JavaScript to the client to render everything, we can now keep components on the server.

## The Problem

Traditional React apps ship a lot of JavaScript. Even with code splitting, users download and parse significant amounts of code before seeing anything useful.

## The Solution

Server Components run on the server and send HTML to the client. The client only receives the minimal JavaScript needed for interactivity.

## Key Benefits

- **Smaller bundles** - Server Components add zero bytes to your bundle
- **Direct data access** - Query databases directly without API routes
- **Streaming** - Send UI as it's ready, not all at once

## When to Use Client Components

Not everything should be a Server Component. Use Client Components for:

- Interactive elements (buttons, forms)
- Browser APIs (localStorage, geolocation)
- State and effects

## The Mental Model

Think of Server Components as the default. Only "opt in" to Client Components when you need interactivity.

This inversion takes some getting used to, but it leads to faster, simpler applications.
    `.trim(),
  },
  "digital-typography": {
    title: "Typography in Digital Products",
    date: "2024.11.20",
    category: "Design",
    content: `
Typography is the foundation of digital interfaces. It's how we communicate with users, establish hierarchy, and express brand personality.

## Choosing Typefaces

When selecting fonts for a digital product, consider:

- **Readability** at small sizes and on screens
- **Character set** for internationalization
- **Variable weights** for flexibility
- **Performance** and loading times

## The Type Scale

A consistent type scale brings order to your typography. Start with a base size and use a mathematical ratio to derive other sizes.

Common ratios include 1.25 (major third), 1.333 (perfect fourth), and 1.5 (perfect fifth).

## Line Height and Measure

Line height affects readability dramatically. For body text, 1.5-1.7 times the font size works well. For headings, tighter leading (1.1-1.3) often looks better.

Measure (line length) should be 45-75 characters for comfortable reading.

## Pairing Typefaces

When using multiple typefaces:

- Contrast is key—pair a serif with a sans-serif
- Limit to 2-3 fonts maximum
- Consider the x-height and proportions

## Performance Considerations

Fonts are render-blocking resources. Optimize by:

- Subsetting to only needed characters
- Using font-display: swap
- Preloading critical fonts
    `.trim(),
  },
  "ai-apis": {
    title: "Building with AI APIs",
    date: "2024.11.10",
    category: "Development",
    content: `
Integrating AI into your applications has never been more accessible. With APIs from OpenAI, Anthropic, and others, you can add powerful language capabilities with just a few lines of code.

## Getting Started

Most AI APIs follow a similar pattern:

1. Authenticate with an API key
2. Send a prompt or messages array
3. Receive a generated response

## Prompt Engineering

The quality of your output depends heavily on your input. Good prompts are:

- **Specific** about the desired format and content
- **Contextualized** with relevant background
- **Constrained** to prevent unwanted outputs

## Streaming Responses

For better UX, stream responses token by token instead of waiting for the full response. This makes the AI feel more responsive and natural.

## Error Handling

AI APIs can fail in unique ways:

- Rate limiting
- Token limits exceeded
- Safety filters triggered
- Model overloaded

Build robust error handling and fallbacks.

## Cost Optimization

API calls add up quickly. Optimize by:

- Caching common responses
- Using smaller models when appropriate
- Limiting max tokens in responses
- Batching requests when possible

## Responsible Use

Always consider the implications of AI-generated content. Include human review for critical outputs and be transparent with users about AI involvement.
    `.trim(),
  },
}

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = posts[slug]

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
          Back to blog
        </Link>

        <header className="mb-12">
          <div className="flex items-center gap-3 text-sm text-muted mb-4">
            <span className="uppercase tracking-wide">{post.category}</span>
            <span>·</span>
            <span className="font-mono tabular-nums">{post.date}</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {post.content.split("\n\n").map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-serif text-xl mt-10 mb-4 tracking-tight"
                >
                  {paragraph.replace("## ", "")}
                </h2>
              )
            }
            if (paragraph.startsWith("- ")) {
              const items = paragraph.split("\n").filter((line) => line.startsWith("- "))
              return (
                <ul key={i} className="my-4 space-y-2">
                  {items.map((item, j) => (
                    <li key={j} className="text-muted leading-relaxed pl-4 border-l-2 border-border">
                      {item.replace("- ", "").split("**").map((part, k) =>
                        k % 2 === 1 ? (
                          <strong key={k} className="text-foreground font-medium">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </li>
                  ))}
                </ul>
              )
            }
            if (paragraph.match(/^\d\./)) {
              const items = paragraph.split("\n").filter((line) => line.match(/^\d\./))
              return (
                <ol key={i} className="my-4 space-y-2 list-decimal list-inside">
                  {items.map((item, j) => (
                    <li key={j} className="text-muted leading-relaxed">
                      {item.replace(/^\d\.\s*/, "").split("**").map((part, k) =>
                        k % 2 === 1 ? (
                          <strong key={k} className="text-foreground font-medium">
                            {part}
                          </strong>
                        ) : (
                          part
                        )
                      )}
                    </li>
                  ))}
                </ol>
              )
            }
            return (
              <p key={i} className="text-muted leading-relaxed my-4">
                {paragraph}
              </p>
            )
          })}
        </div>
      </article>
    </main>
  )
}
