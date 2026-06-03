import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI Daily Test',
  description: 'AI 每日热点',
  keywords: ['AI', '技术', '博客'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="min-h-screen">
        <header className="border-b border-gray-800 bg-surface/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <a href="/" className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              AI Daily Test
            </a>
            <nav className="flex gap-6 text-sm text-gray-400">
              <a href="/" className="hover:text-white transition-colors">首页</a>
              <a href="/about" className="hover:text-white transition-colors">关于</a>
            </nav>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} AI Daily Test. Powered by AI.
          </div>
        </footer>
      </body>
    </html>
  )
}
