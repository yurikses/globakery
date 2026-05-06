import type { TableHeader, TableRow } from '#/components/ui/table'
import { PageLoader } from '#/components/page-loader'
import { PageTitle } from '#/components/page-title'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ModalWindow } from '#/components/ui/modal'
import { Table } from '#/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/factories')({
  component: DashboardFactories,
  pendingComponent: PageLoader,
})

const headers: TableHeader[] = [
  { name: 'Название', type: 'text', accessorKey: 'name' },
  { name: 'Адрес', type: 'text', accessorKey: 'address' },
  { name: 'Статус', type: 'badge', accessorKey: 'status' },
]

const tableData: TableRow[] = [
  {
    name: 'Завод 1',
    address: 'г. Москва, ул. Ленина, 1',
    status: { text: 'Активный', variant: 'success' },
  },
  {
    name: 'Завод 2',
    address: 'г. Санкт-Петербург, ул. Невская, 10',
    status: { text: 'Закрыт', variant: 'danger' },
  },
  {
    name: 'Завод 3',
    address: 'г. Москва, ул. Ленина, 1',
    status: { text: 'Активный', variant: 'success' },
  },
]

function DashboardFactories() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <div className="flex flex-col">
      <div className="p-4 flex items-center justify-between gap-4 flex-1">
        <PageTitle
          title="Управление заводами"
          details="Список всех предприятий комбината"
        />
        <ModalWindow
          buttonText="+ Добавить завод"
          open={modalShow}
          onOpenChange={setModalShow}
          title="Добавление нового завода"
        >
          <NewFactoryForm />
        </ModalWindow>
      </div>

      <div className="p-4">
        <Table headers={headers} data={tableData} actions="all" />
      </div>
    </div>
  )
}

function NewFactoryForm() {
  return (
    <form className='flex flex-col gap-2 '>
      <Input label="Название завода" />
      <Input label="Адрес завода" />

      <div className='flex gap-2 justify-end mt-2'>
        <Button variant="secondary">Отмена</Button>
        <Button variant="primary" >Добавить</Button>
      </div>
    </form>
  )
}
