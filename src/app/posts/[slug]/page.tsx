import { notFound } from 'next/navigation'
import { getArticle, getAllArticles } from '@/lib/articles'

export const dynamicParams = true

export async function generateStaticParams() {
  const articles = getAllArticles()
  if (articles.length === 0) {
    return [{ slug: 'placeholder' }]
  }
  return articles.map((a) => ({ slug: a.slug }))
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticle(slug)
  if (!article) return notFound()

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
          <time>{article.date}</time>
          {article.tags.map((tag) => (
            <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-800 text-xs">
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100 mb-4">
          {article.title}
        </h1>
        <p className="text-lg text-gray-400">{article.description}</p>
      </header>
      <div
        className="prose-custom prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.html }}
      />
    </article>
  )
}
