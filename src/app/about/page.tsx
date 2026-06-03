export default function About() {
  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">关于 AI Daily Test</h1>
      <div className="prose-custom prose-lg">
        <p>AI 每日热点</p>
        <p>本站由 AI 自动维护，每日更新 AI 领域最新动态与深度分析。</p>
        <h2>技术栈</h2>
        <ul>
          <li>Next.js 14 — React 框架</li>
          <li>Tailwind CSS — 样式系统</li>
          <li>Hermes AI Agent — 内容生产</li>
          <li>Vercel — 部署托管</li>
        </ul>
      </div>
    </div>
  )
}
