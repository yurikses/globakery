import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title'
import { AccentCard } from '#/components/ui/accent-card'

import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { ModalWindow } from '#/components/ui/modal'
import { Table } from '#/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

export const Route = createFileRoute('/dashboard/factories')({
  component: DashboardSettings,
})

const tableData = [
  {
    Название: 'Завод 1',
    Адрес: 'г. Москва, ул. Ленина, 1',
    Статус: 'Активный',
  },
  {
    Название: 'Завод 1',
    Адрес: 'г. Москва, ул. Ленина, 1',
    Статус: 'Активный',
  },
  {
    Название: 'Завод 1',
    Адрес: 'г. Москва, ул. Ленина, 1',
    Статус: 'Активный',
  },
]

function DashboardSettings() {
  const [modalShow, setModalShow] = useState(false)

  return (
    <div className="flex flex-col ">
      <AppHeader />
      <div className="p-4 flex items-center justify-between gap-4 flex-1">
        <PageTitle
          title="Управление заводами"
          details="Список всех предприятий комбината"
        />
        <Button variant="primary"> + Добавить завод</Button>
      </div>

      <div className="p-4">
        <Table headers={['Название', 'Адрес', 'Статус']} data={tableData} />
      </div>

      <div>
        <AccentCard
          title="Алена"
          accentText="Пример"
          color="red"
          details="Гандоны "
          className="w-60"
        ></AccentCard>
      </div>

      <ModalWindow open={modalShow} onOpenChange={setModalShow}>
        
        <form action="">
          <Input label='Название завода' placeholder='Введите название завода'/>
        </form>
        <div>
          <Button variant="danger" onClick={() => setModalShow(false)}>
            Закрыть
          </Button>
        </div>
      </ModalWindow>
    </div>
  )
}
