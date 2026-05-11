import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-8 ">
      <div className="bg-surface p-12 rounded-2xl shadow-sm border border-border text-center flex flex-col items-center">
        <h1 className="text-4xl font-bold text-primary mb-4">Globakery</h1>
        <p className="text-text-2 mb-8">Добро пожаловать на главную страницу!</p>

        <Link
          to="/dashboard"
          className="bg-primary hover:bg-primary-dark text-surface px-6 py-3 rounded-lg font-semibold shadow-sm transition-colors"
        >
          Перейти в панель управления &rarr;
        </Link>
      </div>
    </div>
  )
}
