import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "docs/content")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  published: boolean
  content: string
}

export interface Project {
  slug: string
  title: string
  description: string
  year: string
  date?: string
  link: string
  image: string
  tech: string[]
  featured: boolean
  content: string
}

export interface AboutContent {
  title: string
  content: string
}

export function getBlogPosts(): BlogPost[] {
  const blogDir = path.join(contentDirectory, "blog")

  if (!fs.existsSync(blogDir)) {
    return []
  }

  const entries = fs.readdirSync(blogDir, { withFileTypes: true })
  const posts: BlogPost[] = []

  for (const entry of entries) {
    let filePath: string
    let slug: string

    if (entry.isDirectory()) {
      // 폴더 구조: blog/slug/index.mdx
      filePath = path.join(blogDir, entry.name, "index.mdx")
      slug = entry.name
    } else if (entry.name.endsWith(".mdx")) {
      // 기존 구조: blog/slug.mdx
      filePath = path.join(blogDir, entry.name)
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
  // 폴더 구조 먼저 확인: blog/slug/index.mdx
  let filePath = path.join(contentDirectory, "blog", slug, "index.mdx")

  // 폴더 구조가 없으면 기존 구조 확인: blog/slug.mdx
  if (!fs.existsSync(filePath)) {
    filePath = path.join(contentDirectory, "blog", `${slug}.mdx`)
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

export function getProjects(): Project[] {
  const projectsDir = path.join(contentDirectory, "projects")

  if (!fs.existsSync(projectsDir)) {
    return []
  }

  const files = fs.readdirSync(projectsDir).filter((file) => file.endsWith(".mdx"))

  const projects = files
    .map((filename) => {
      const filePath = path.join(projectsDir, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title || "",
        description: data.description || "",
        year: data.year || "",
        date: data.date || "",
        link: data.link || "#",
        image: data.image || "",
        tech: data.tech || [],
        featured: data.featured === true,
        content,
      }
    })
    .sort((a, b) => {
      // date가 있으면 date로 정렬, 없으면 year로 정렬
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      return parseInt(b.year) - parseInt(a.year)
    })

  return projects
}

export function getProject(slug: string): Project | null {
  const filePath = path.join(contentDirectory, "projects", `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    title: data.title || "",
    description: data.description || "",
    year: data.year || "",
    date: data.date || "",
    link: data.link || "#",
    image: data.image || "",
    tech: data.tech || [],
    featured: data.featured === true,
    content,
  }
}

export function getAboutContent(): AboutContent | null {
  const filePath = path.join(contentDirectory, "about.mdx")

  if (!fs.existsSync(filePath)) {
    return null
  }

  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    title: data.title || "소개",
    content,
  }
}
