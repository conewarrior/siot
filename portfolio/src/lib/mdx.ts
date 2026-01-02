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

  const files = fs.readdirSync(blogDir).filter((file) => file.endsWith(".mdx"))

  const posts = files
    .map((filename) => {
      const filePath = path.join(blogDir, filename)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug: filename.replace(/\.mdx$/, ""),
        title: data.title || "",
        description: data.description || "",
        date: data.date || "",
        category: data.category || "",
        published: data.published !== false,
        content,
      }
    })
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(contentDirectory, "blog", `${slug}.mdx`)

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
        link: data.link || "#",
        image: data.image || "",
        tech: data.tech || [],
        featured: data.featured === true,
        content,
      }
    })
    .sort((a, b) => parseInt(b.year) - parseInt(a.year))

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
