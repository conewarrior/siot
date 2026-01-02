import { Header } from "@/components/header"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />

      <section className="w-full max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="space-y-8">
          <h1 className="font-serif text-8xl tracking-tight text-foreground">
            404
          </h1>
          <p className="text-muted text-lg">
            페이지를 찾을 수 없습니다.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-foreground border border-border px-6 py-3 rounded-full hover:bg-secondary transition-colors"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </section>
    </main>
  )
}
