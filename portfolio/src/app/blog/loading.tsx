import { Header } from "@/components/header"

export default function BlogLoading() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-16">
        <div className="h-10 w-32 bg-secondary rounded animate-pulse mb-4" />
        <div className="h-6 w-80 bg-secondary rounded animate-pulse mb-12" />

        <div className="space-y-0">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="py-6 border-t border-border">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="h-6 w-64 bg-secondary rounded animate-pulse" />
                <div className="h-4 w-20 bg-secondary rounded animate-pulse" />
              </div>
              <div className="h-4 w-full bg-secondary rounded animate-pulse mb-2" />
              <div className="h-3 w-16 bg-secondary rounded animate-pulse" />
            </div>
          ))}
          <div className="border-t border-border" />
        </div>
      </section>
    </main>
  )
}
