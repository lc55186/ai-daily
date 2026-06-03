import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'articles')

export interface ArticleMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
  author: string
  html: string
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(postsDirectory)) return []
  const files = fs.readdirSync(postsDirectory).filter(f => f.endsWith('.md'))
  const articles = files.map(file => {
    const slug = file.replace(/\.md$/, '')
    return getArticle(slug)
  }).filter((a): a is ArticleMeta => a !== null)
  return articles.sort((a, b) => b.date.localeCompare(a.date))
}

export function getArticle(slug: string): ArticleMeta | null {
  try {
    const filePath = path.join(postsDirectory, `${slug}.md`)
    if (!fs.existsSync(filePath)) return null
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(source)
    const html = markdownToHtml(content)
    return {
      slug,
      title: data.title || slug,
      date: data.date || '',
      description: data.description || '',
      tags: data.tags || [],
      author: data.author || 'AI Assistant',
      html,
    }
  } catch {
    return null
  }
}

function markdownToHtml(md: string): string {
  let html = md
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-400 text-sm">$1</code>')
    .replace(/```[\s\S]*?```/g, (match) => {
      const code = match.replace(/```\w*\n?/, '').replace(/```$/, '')
      return `<pre class="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto"><code>${code}</code></pre>`
    })
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
  return `<p>${html}</p>`
}
