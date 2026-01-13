import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "docs/content")

export interface PortfolioSlide {
  type: "cover" | "problem" | "process" | "outcome" | "reflection"
  title: string
  diagram?: "AsIsFlow" | "ToBeFlow" | "FeatureConsolidation"
}

export interface PortfolioSection {
  slug: string
  title: string
  order: number
  color: string
  textColor: string
  slides: PortfolioSlide[]
  content: string // MDX raw content
}

export async function getPortfolioSections(): Promise<PortfolioSection[]> {
  const portfolioDir = path.join(contentDirectory, "portfolio")

  if (!fs.existsSync(portfolioDir)) {
    return []
  }

  const entries = fs.readdirSync(portfolioDir, { withFileTypes: true })
  const sections: PortfolioSection[] = []

  for (const entry of entries) {
    // 언더스코어로 시작하는 파일/폴더는 제외
    if (entry.name.startsWith("_")) {
      continue
    }

    let filePath: string
    let slug: string

    if (entry.isDirectory()) {
      // 폴더 구조: portfolio/slug/index.mdx
      filePath = path.join(portfolioDir, entry.name, "index.mdx")
      slug = entry.name
    } else if (entry.name.endsWith(".mdx")) {
      // 기존 구조: portfolio/slug.mdx
      filePath = path.join(portfolioDir, entry.name)
      slug = entry.name.replace(/\.mdx$/, "")
    } else {
      continue
    }

    if (!fs.existsSync(filePath)) continue

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    sections.push({
      slug,
      title: data.title || "",
      order: typeof data.order === "number" ? data.order : 999,
      color: data.color || "#000000",
      textColor: data.textColor || "#FFFFFF",
      slides: Array.isArray(data.slides) ? data.slides : [],
      content,
    })
  }

  // order 순으로 정렬
  return sections.sort((a, b) => a.order - b.order)
}

export async function getPortfolioSection(
  slug: string
): Promise<PortfolioSection | null> {
  const portfolioDir = path.join(contentDirectory, "portfolio")

  // 폴더 구조 먼저 확인: portfolio/slug/index.mdx
  let filePath = path.join(portfolioDir, slug, "index.mdx")

  // 폴더 구조가 없으면 기존 구조 확인: portfolio/slug.mdx
  if (!fs.existsSync(filePath)) {
    filePath = path.join(portfolioDir, `${slug}.mdx`)
  }

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || "",
    order: typeof data.order === "number" ? data.order : 999,
    color: data.color || "#000000",
    textColor: data.textColor || "#FFFFFF",
    slides: Array.isArray(data.slides) ? data.slides : [],
    content,
  }
}
