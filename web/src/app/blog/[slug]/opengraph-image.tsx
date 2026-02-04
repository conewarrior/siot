import { ImageResponse } from "next/og"
import { getBlogPost } from "@/lib/mdx"

export const runtime = "nodejs"

export const alt = "블로그 글"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getBlogPost(slug)

  const title = post?.title || "블로그"
  const category = post?.category || ""
  const date = post?.date?.replace(/-/g, ".") || ""

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 80,
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1a1a 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontSize: 20,
              color: "#a1a1aa",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            <span>{category}</span>
            {category && date && <span style={{ color: "#52525b" }}>·</span>}
            <span style={{ fontFamily: "monospace" }}>{date}</span>
          </div>

          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.02em",
              lineHeight: 1.2,
              maxWidth: "90%",
            }}
          >
            {title}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                width: 60,
                height: 4,
                backgroundColor: "#f97316",
                borderRadius: 2,
              }}
            />
            <div
              style={{
                fontSize: 24,
                color: "#71717a",
              }}
            >
              포트폴리오
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
