import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "포트폴리오",
  description: "포트폴리오 상세 페이지",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function PortfolioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      forcedTheme="light"
      disableTransitionOnChange
    >
      <div className="min-h-screen bg-background text-foreground">
        {children}
      </div>
    </ThemeProvider>
  );
}
