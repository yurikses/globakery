interface TableProps {
  headers?: string[]
  data?: Record<string, string>[]
}

export function Table({ headers = [], data = [] }: TableProps) {
  // Дефолтные заголовки на случай, если они не переданы
  const tableHeaders =
    headers.length > 0 ? headers : ['Название', 'Адрес', 'Статус', 'Действия']

  return (
    <table className="w-full text-left rounded-lg overflow-hidden border border-border bg-surface">
      <thead>
        <tr className="border-b border-border text-xs text-text-3 uppercase tracking-wide">
          {tableHeaders.map((header, index) => (
            <th key={index} className="p-2">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => <TableRow key={index} data={row} />)
        ) : (
          <tr>
            <td
              colSpan={tableHeaders.length}
              className="p-8 text-center text-sm text-text-3"
            >
              Нет данных
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

interface TableRowProps {
  data: Record<string, string>
}

function TableRow({ data }: TableRowProps) {
  if (!data || Object.keys(data).length === 0) {
    return null
  }

  // Получаем значения объекта для рендера ячеек
  const cells = Object.values(data)

  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
      {cells.map((cellValue, index) => (
        <td
          key={index}
          className={`p-2 text-sm ${index === 0 ? 'text-text font-semibold' : 'text-text-2'}`}
        >
          {cellValue}
        </td>
      ))}

      {/* Статичная колонка с действиями (если таблица подразумевает действия) */}
      <td className="p-2 text-sm">
        <button className="text-info hover:underline transition-all">
          Редактировать
        </button>
        <button className="text-danger hover:underline ml-4 transition-all">
          Удалить
        </button>
      </td>
    </tr>
  )
}
