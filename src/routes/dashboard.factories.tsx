import { AppHeader } from '#/components/header'
import { PageLoader } from '#/components/page-loader'
import { PageTitle } from '#/components/page-title'
import { AccentCard } from '#/components/ui/accent-card'
import { Badge } from '#/components/ui/badge'

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

function DashboardFactories() {
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
        <Table
          headers={['Название', 'Адрес', 'Статус']}
          data={tableData}
          actions="all"
        />
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

      <ModalWindow
        open={modalShow}
        onOpenChange={setModalShow}
        title="Добавить новый завод"
      >
        <form action="" className="flex flex-col mt-4 gap-2">
          <Input
            label="Название завода"
            placeholder="Введите название завода"
            required
          />
          <div className=" ml-auto flex gap-1">
            <Button variant="danger" onClick={() => setModalShow(false)}>
              Закрыть
            </Button>
            <Button variant="secondary">Сохранить</Button>
          </div>
        </form>
      </ModalWindow>

      <div className="p-4 flex flex-wrap gap-4 items-center bg-surface border border-border rounded-lg m-4">
        <div className="flex flex-col gap-2">
          <span className="text-sm text-text-2">Основные:</span>
          <div className="flex gap-2 flex-wrap">
            <Badge value="Primary" variant="primary" />
            <Badge value="Primary Soft" variant="primarySoft" />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-l border-border pl-4">
          <span className="text-sm text-text-2">Нейтральные:</span>
          <div className="flex gap-2 flex-wrap">
            <Badge value="Secondary" variant="secondary" />
            <Badge value="Outline" variant="outline" />
            <Badge value="Ghost" variant="ghost" />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-l border-border pl-4">
          <span className="text-sm text-text-2">Статусы (Soft):</span>
          <div className="flex gap-2 flex-wrap">
            <Badge value="Success" variant="success" />
            <Badge value="Warning" variant="warning" />
            <Badge value="Danger" variant="danger" />
            <Badge value="Info" variant="info" />
          </div>
        </div>

        <div className="flex flex-col gap-2 border-l border-border pl-4">
          <span className="text-sm text-text-2">Статусы (Solid):</span>
          <div className="flex gap-2 flex-wrap">
            <Badge value="Success Solid" variant="successSolid" />
            <Badge value="Danger Solid" variant="dangerSolid" />
          </div>
        </div>
      </div>
    </div>
  )
}
