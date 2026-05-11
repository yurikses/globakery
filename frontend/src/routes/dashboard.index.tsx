import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute("/dashboard/")({
  component: DashboardIndex,
})

function DashboardIndex() {
  return (
    <div className="bg-surface p-8 rounded-xl shadow-sm border border-border">
      
    </div>
  )
}
