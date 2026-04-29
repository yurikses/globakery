import { AppHeader } from '#/components/header'
import { PageTitle } from '#/components/page-title'

import { Button } from '#/components/ui/button'
import { Table } from '#/components/ui/table'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/factories')({
  component: DashboardSettings,
})

const tableData = [
  {
    "Название": 'Завод 1',
    "Адрес": 'г. Москва, ул. Ленина, 1',
    "Статус": 'Активный',
    
  },
  {
    "Название": 'Завод 1',
    "Адрес": 'г. Москва, ул. Ленина, 1',
    "Статус": 'Активный',
    
  },
  {
    "Название": 'Завод 1',
    "Адрес": 'г. Москва, ул. Ленина, 1',
    "Статус": 'Активный',
    
  }
]


function DashboardSettings() {
  return (
    <div className='flex flex-col'>
      <AppHeader/>
      <div className="p-4 flex items-center justify-between gap-4 flex-1">
        <PageTitle title='Управление заводами' details='Список всех предприятий комбината' />
        <Button  variant='primary'> + Добавить завод</Button>
      </div>
      
      <div className='p-4'>
        <Table data={tableData} />
      </div>
    </div>
    
  )
}
