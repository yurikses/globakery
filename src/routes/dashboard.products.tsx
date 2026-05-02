import { AppHeader } from '#/components/header'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col ">
      <AppHeader />
      Hello "/dashboard/products"!
    </div>
  )
}
