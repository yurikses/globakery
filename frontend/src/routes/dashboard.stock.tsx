import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title'
import type { BadgeVariants } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ModalWindow } from '#/components/ui/modal'
import { SelectMenu } from '#/components/ui/select'
import { Table } from '#/components/ui/table'
import type { TableHeader } from '#/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { AlarmClock } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/stock')({
  component: RouteComponent,
})

type StockItem = {
  id: string
  name: string
  count: string
  quantityType: quantityType
  expDays: number
}

type quantityType =
  | 'кг'
  | 'шт.'
  | 'л'
  | 'упак.'
  | 'короб.'
  | 'ящ.'
  | 'меш.'
  | 'бут.'
  | 'банка'
  | 'пакет'
  | 'другое'

const stockItems: StockItem[] = [
  {
    id: 'poshelnahui',
    name: 'Сахар',
    count: '120',
    quantityType: 'кг',
    expDays: 180,
  },
  {
    id: 'poshelnahui2',
    name: 'Яйца не куриные',
    count: '120',
    quantityType: 'кг',
    expDays: 180,
  },
  {
    id: 'poshelnahui3',
    name: 'Плесень',
    count: '120',
    quantityType: 'кг',
    expDays: 180,
  },
]

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
    quantityType: 'кг',
    exp: new Date().toLocaleDateString(),
  },
  {
    name: 'Мука',
    count: '34',
    quantityType: 'кг',
    exp: new Date().toLocaleDateString(),
  },
  {
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
      <div className="flex flex-col p-4 ">
        <PageTitle
          title="Склад"
          details="Управдление запасами сырья и готовой продукции на складе"
        />

        <div className="flex py-4 gap-4 items-center justify-end">
          <StockDeliveryForm />
          <NewItemForm />
          <Input className="w-120 h-8" />
          <Button variant="primary" className="h-8">
            Поиск
          </Button>
        </div>
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

function StockDeliveryForm() {
  const [open, setOpen] = useState(false)

  return (
    <ModalWindow
      open={open}
      onOpenChange={setOpen}
      buttonText="Новая поставка"
      className=""
      title="Поставка"
      description="Укажите материалы для добавления на склад"
    >
      <form className="flex flex-col">
        <span className='uppercase text-text-2 tracking-wide font-semibold text-xs mt-4 mb-1'>Материалы склада</span>
        <div className='flex flex-col gap-4 pb-4'>
          {stockItems.map((item) => (
            <div key={item.id} className='flex items-center gap-3'>
              <span className='text-text-2 capitalize font-semibold flex-1'>{ item.name }</span>
              <Input containerClassName='w-30' placeholder='Количество' type='number' max={999}/>
            </div>
          ))}
        </div>
        

        <div className="flex gap-2 mt-4 ml-auto">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </div>
      </form>
    </ModalWindow>
  )
}

function NewItemForm() {
  const [open, setOpen] = useState(false)
  const quantityTypes: { value: quantityType; text: string }[] = [
    { value: 'кг', text: 'кг' },
    { value: 'шт.', text: 'шт.' },
    { value: 'л', text: 'л' },
    { value: 'упак.', text: 'упак.' },
    { value: 'короб.', text: 'короб.' },
    { value: 'ящ.', text: 'ящ.' },
    { value: 'меш.', text: 'меш.' },
    { value: 'бут.', text: 'бут.' },
    { value: 'банка', text: 'банка' },
    { value: 'пакет', text: 'пакет' },
    { value: 'другое', text: 'другое' },
  ]

  return (
    <ModalWindow
      open={open}
      onOpenChange={setOpen}
      buttonText="+ Новый материал"
      className="mr-auto"
      title="Новый материал"
      buttonVariant="secondary"
      description="Укажите данные нового вида материала для добавления на склад"
    >
      <form className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 py-4">
          <Input label="Название" placeholder="Сахар" />
          <Input label="Количество" placeholder="120" />
          <SelectMenu
            options={quantityTypes}
            placeholder="Единицы измерения"
            size="sm"
            label="Единица измерения"
          />
        </div>

        <div className="flex gap-2 ml-auto">
          <Button
            variant="secondary"
            type="button"
            onClick={() => setOpen(false)}
          >
            Отмена
          </Button>
          <Button variant="primary" type="submit">
            Добавить
          </Button>
        </div>
      </form>
    </ModalWindow>
  )
}
