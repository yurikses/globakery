import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title';
import { Table  } from '#/components/ui/table'
import type {TableHeader} from '#/components/ui/table';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products')({
  component: RouteComponent,
})

const productHeaders: TableHeader[] = [
  { name: 'Название', type: 'text', accessorKey: 'name' },
  { name: 'Себестоимость', type: 'text', accessorKey: 'selfprice' },
  { name: 'Продажная стоимость', type: 'text', accessorKey: 'price' },
  { name: 'Рецептура', type: 'text', accessorKey: 'recipe' },
]

function RouteComponent() {
  return (
    <div className="flex flex-col ">
      <AppHeader />
      
      <div className="flex flex-col gap-2 p-4">
        <PageTitle
          title="Изделия"
          details="Список всех изделий завода и их рецептур"
        />
        <div>
          <Table headers={productHeaders} />
        </div>
      </div>
    </div>
  )
}
