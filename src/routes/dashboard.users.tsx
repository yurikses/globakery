import { PageTitle } from '#/components/page-title'
import { AccentCard } from '#/components/ui/accent-card'
import type { BadgeVariants } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Table  } from '#/components/ui/table'
import type {TableHeader} from '#/components/ui/table';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/users')({
  component: RouteComponent,
})
const usersHeaders = [
  { name: 'Имя', type: 'text', accessorKey: 'name' },
  { name: 'Должность', type: 'badge', accessorKey: 'position' },
  { name: 'Завод', type: 'text', accessorKey: 'department' },
  { name: 'Статус', type: 'badge', accessorKey: 'status' },
] as const satisfies readonly TableHeader[]

type UserData = {
  [K in (typeof usersHeaders)[number] as K['accessorKey']]: K['type'] extends 'badge'
    ? { text: string; variant?: BadgeVariants } | string
    : string
}

const usersData: UserData[] = [
  {
    name: 'Иван Иванов',
    position: { text: 'Менеджер', variant: 'primary' },
    department: 'Завод 1',
    status: { text: 'Активный', variant: 'success' },
  },
  {
    name: 'Петр Петров',
    position: { text: 'Рабочий', variant: 'success' },
    department: 'Завод 2',
    status: { text: 'Активный', variant: 'success' },
  },
  {
    name: 'Сергей Сергеев',
    position: { text: 'Инженер', variant: 'warning' },
    department: 'Завод 1',
    status: { text: 'В отпуске', variant: 'info' },
  },
]

function RouteComponent() {
  return (
    <div className="flex flex-col gap-4 p-4">
      <PageTitle
        title="Пользователи"
        details="Управение сотрудниками комбината, их ролями и доступами"
      />
      <div className="flex gap-4 ">
        <AccentCard
          accentText="120"
          title="Пользователи"
          details="сотрудников"
          color="yellow"
          className="flex-1"
        />
        <AccentCard
          accentText="15"
          title="По заводам"
          details="среднее количество сотрудников на завод"
          color="green"
          className="flex-1"
        />
        <AccentCard
          accentText="80%"
          title="Активных сотрудников"
          details="сотрудников"
          color="yellow"
          className="flex-1"
        />
      </div>

      <div className="flex items-center gap-2 w-full justify-end">
        <Input className="w-120" placeholder="Поиск пользователя" />
        <Button variant="primary">Найти</Button>
      </div>

      <div>
        <Table headers={usersHeaders as any} actions="all" data={usersData as any} />
      </div>
    </div>
  )
}
