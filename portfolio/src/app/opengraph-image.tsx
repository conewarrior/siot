import { ImageResponse } from "next/og"

export const runtime = "nodejs"

export const alt = "포트폴리오"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0a",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a1a 0%, transparent 50%), radial-gradient(circle at 75% 75%, #1a1a1a 0%, transparent 50%)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#fafafa",
              letterSpacing: "-0.02em",
            }}
          >
            포트폴리오
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#a1a1aa",
              letterSpacing: "0.05em",
            }}
          >
            개발자 & 디자이너
          </div>
          <div
            style={{
              marginTop: 20,
              width: 80,
              height: 4,
              backgroundColor: "#f97316",
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
