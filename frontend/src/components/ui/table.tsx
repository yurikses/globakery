import type { ReactNode } from 'react'
import { Badge } from './badge'
import type { BadgeVariants } from './badge'
import { Button } from './button'

export type TableHeader = {
  name: string
  type: 'text' | 'badge' | 'custom'
  accessorKey: string
}

export type TableRow = {
  [header: string]:
    | string
    | { text: string; variant: BadgeVariants }
    | ReactNode
}

interface TableProps {
  headers: TableHeader[]
  data?: Record<
    string,
    string | { text: string; variant: BadgeVariants } | ReactNode
  >[]
  actions?: 'all' | 'edit' | 'delete' | 'none'
}

export function Table({ headers, data = [], actions = 'all' }: TableProps) {
  return (
    <div className="w-full overflow-hidden rounded-lg border border-border bg-surface shadow-sm">
      <table className="w-full border-collapse text-center">
        <thead>
          <tr className="border-b border-border text-xs text-text-3 uppercase tracking-wide bg-surface-2/50">
            {headers.map((header, index) => (
              <th
                key={index}
                className="p-3 align-middle border-r border-border font-semibold"
              >
                {header.name}
              </th>
            ))}
            {/* Статичный заголовок для действий */}
            <th className="p-3 align-middle font-semibold">Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, index) => (
              <TableRow
                key={index}
                data={row}
                headers={headers}
                actions={actions}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan={headers.length + 1}
                className="p-8 text-center text-sm text-text-3"
              >
                Нет данных
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

interface TableRowProps {
  data: Record<
    string,
    string | { text: string; variant: BadgeVariants } | ReactNode
  >
  headers: TableHeader[]
  actions: 'all' | 'edit' | 'delete' | 'none'
}

function TableRow({ data, headers, actions }: TableRowProps) {
  if (Object.keys(data).length === 0) {
    return null
  }

  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
      {headers.map((header, index) => {
        const value = data[header.accessorKey]
        return (
          <td
            key={index}
            className={`p-3 text-sm align-middle border-r border-border ${index === 0 ? 'text-text font-semibold' : 'text-text-2'}`}
          >
            <div className="flex items-center justify-center">
              {header.type === 'badge' && typeof value === 'object' ? (
                <Badge variant={(value as { variant: any }).variant}>
                  {(value as { text: string }).text}
                </Badge>
              ) : header.type === 'custom' && typeof value === 'object' ? (
                (value as ReactNode)
              ) : (
                (value as string)
              )}
            </div>
          </td>
        )
      })}

      {/* Статичная колонка с действиями */}
      <td className="p-3 text-sm align-middle">
        <div className="flex gap-2 items-center justify-center">
          {actions === 'all' || actions === 'edit' ? (
            <Button
              variant="ghost"
              className="text-info px-2 py-1 h-auto min-h-0"
            >
              Редактировать
            </Button>
          ) : null}

          {actions === 'all' || actions === 'delete' ? (
            <Button
              variant="ghost"
              className="text-danger px-2 py-1 h-auto min-h-0"
            >
              Удалить
            </Button>
          ) : null}

          {actions === 'none' ? (
            <span className="text-text-3">Нет действий</span>
          ) : null}
        </div>
      </td>
    </tr>
  )
}
