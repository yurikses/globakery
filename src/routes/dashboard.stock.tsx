import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/stock')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col ">
      <AppHeader />
      <div className='flex flex-col p-4 '>
        <PageTitle
          title="Склад"
          details="Управдление запасами сырья и готовой продукции на складе"
        />
      </div>
    </div>
  )
}
