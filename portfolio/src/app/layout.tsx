import type { Metadata } from "next";
import "./globals.css";
import { BackgroundBeamsWithCollision } from "@/components/background-beams";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "개발자 & 디자이너 포트폴리오",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="antialiased">
        <BackgroundBeamsWithCollision>{children}</BackgroundBeamsWithCollision>
      </body>
    </html>
  );
}
