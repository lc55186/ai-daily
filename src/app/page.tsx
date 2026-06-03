import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

export default function Home() {
  const articles = getAllArticles()

  return (
    <div>
      <section className="py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
          探索 AI 前沿
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          每日更新 AI 领域最新动态、深度评测与技术洞察
        </p>
      </section>

      <section className="space-y-6">
        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-500">
            <p className="text-lg">暂无文章</p>
            <p className="text-sm mt-2">使用 content-gen.py 生成第一篇文章</p>
          </div>
        ) : (
          articles.map((article) => (
            <Link
              key={article.slug}
              href={`/posts/${article.slug}`}
              className="block p-6 rounded-xl bg-card border border-gray-800 card-hover"
            >
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                <time>{article.date}</time>
                {article.tags.map((tag) => (
                  <span key={tag} className="px-2 py-0.5 rounded-full bg-gray-800 text-xs">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="text-xl font-bold text-gray-100 mb-2">{article.title}</h2>
              <p className="text-gray-400 text-sm line-clamp-2">{article.description}</p>
            </Link>
          ))
        )}
      </section>
    </div>
  )
}
