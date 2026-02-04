import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "../content")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  published: boolean
  content: string
}

export function getBlogPosts(): BlogPost[] {
  if (!fs.existsSync(contentDirectory)) {
    return []
  }

  const entries = fs.readdirSync(contentDirectory, { withFileTypes: true })
  const posts: BlogPost[] = []

  for (const entry of entries) {
    // 언더스코어로 시작하는 파일/폴더는 제외 (예: _drafts)
    if (entry.name.startsWith("_")) {
      continue
    }

    let filePath: string
    let slug: string

    if (entry.isDirectory()) {
      // 폴더 구조: content/slug/index.mdx
      filePath = path.join(contentDirectory, entry.name, "index.mdx")
      slug = entry.name
    } else if (entry.name.endsWith(".mdx")) {
      // 파일 구조: content/slug.mdx
      filePath = path.join(contentDirectory, entry.name)
      slug = entry.name.replace(/\.mdx$/, "")
    } else {
      continue
    }

    if (!fs.existsSync(filePath)) continue

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    if (data.published === false) continue

    posts.push({
      slug,
      title: data.title || "",
      description: data.description || "",
      date: data.date || "",
      category: data.category || "",
      published: data.published !== false,
      content,
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  // 폴더 구조 먼저 확인: content/slug/index.mdx
  let filePath = path.join(contentDirectory, slug, "index.mdx")

  // 폴더 구조가 없으면 파일 구조 확인: content/slug.mdx
  if (!fs.existsSync(filePath)) {
    filePath = path.join(contentDirectory, `${slug}.mdx`)
  }

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    date: data.date || "",
    category: data.category || "",
    published: data.published !== false,
    content,
  }
}
