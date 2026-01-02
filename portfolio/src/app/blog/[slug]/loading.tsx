import { Header } from "@/components/header"

export default function BlogPostLoading() {
  return (
    <main className="min-h-screen">
      <Header />

      <article className="w-full max-w-2xl mx-auto px-6 py-16">
        <div className="h-5 w-40 bg-secondary rounded animate-pulse mb-8" />

        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-4 w-16 bg-secondary rounded animate-pulse" />
            <div className="h-4 w-4 bg-secondary rounded animate-pulse" />
            <div className="h-4 w-24 bg-secondary rounded animate-pulse" />
          </div>
          <div className="h-10 w-full bg-secondary rounded animate-pulse mb-2" />
          <div className="h-10 w-3/4 bg-secondary rounded animate-pulse" />
        </header>

        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-5 w-full bg-secondary rounded animate-pulse" />
          ))}
          <div className="h-5 w-2/3 bg-secondary rounded animate-pulse" />
          <div className="h-32" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-5 w-full bg-secondary rounded animate-pulse" />
          ))}
        </div>
      </article>
    </main>
  )
}
