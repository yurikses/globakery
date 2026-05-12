import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title'
import type { BadgeVariants } from '#/components/ui/badge'
import { Table  } from '#/components/ui/table'
import type {TableHeader} from '#/components/ui/table';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/stock')({
  component: RouteComponent,
})

const stockHeaders = [
  { name: 'Название', type: 'text', accessorKey: 'name' },
  { name: 'Количество', type: 'text', accessorKey: 'count' },
  { name: 'Единицы исчисления', type: 'text', accessorKey: 'quantityType' },
  { name: 'Срок годности', type: 'text', accessorKey: 'exp' },
] as const satisfies readonly TableHeader[]

type StockData = {
  [K in (typeof stockHeaders)[number] as K['accessorKey']]: K['type'] extends 'badge'
    ? { text: string; variant?: BadgeVariants } | string
    : string
}

const stockItemsData: StockData[] = [
  {
    name: 'Сахар',
    count: '120',
    quantityType: 'кг.',
    exp: new Date().toLocaleDateString(),
  },
  {
    name: 'Мука',
    count: '34',
    quantityType: 'кг.',
    exp: new Date().toLocaleDateString(),
  },{
    name: 'Батон белый',
    count: '120',
    quantityType: 'шт.',
    exp: new Date().toLocaleDateString(),
  },
]



function RouteComponent() {
  return (
    <div className="flex flex-col ">
      <AppHeader />
      <div className='flex flex-col p-4 '>
        <PageTitle
          title="Склад"
          details="Управдление запасами сырья и готовой продукции на складе"
        />

        <div>
          <Table
            headers={stockHeaders as any}
            actions="all"
            data={stockItemsData as any}
          />
        </div>
      </div>
    </div>
  )
}
