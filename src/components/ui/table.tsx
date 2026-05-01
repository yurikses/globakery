interface TableProps<T extends string> {
  headers: T[]
  data?: Record<T, string>[]
}

export function Table<T extends string>({ headers, data = [] }: TableProps<T>) {
  return (
    <table className="w-full text-left rounded-lg overflow-hidden border border-border bg-surface">
      <thead>
        <tr className="border-b border-border text-xs text-text-3 uppercase tracking-wide">
          {headers.map((header, index) => (
            <th key={index} className="p-2">
              {header}
            </th>
          ))}
          {/* Статичный заголовок для действий добавляем вручную */}
          <th className="p-2">Действия</th>
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <TableRow key={index} data={row} headers={headers} />
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
  )
}

interface TableRowProps<T extends string> {
  data: Record<T, string>
  headers: T[]
}

function TableRow<T extends string>({ data, headers }: TableRowProps<T>) {
  if (Object.keys(data).length === 0) {
    return null
  }

  return (
    <tr className="border-b border-border last:border-0 hover:bg-surface-2 transition-colors">
      {/*
        Вместо Object.values(data) мы перебираем headers и берем значения по ключу.
        Это гарантирует, что колонки будут идти ровно в том порядке, в котором переданы заголовки!
      */}
      {headers.map((header, index) => (
        <td
          key={index}
          className={`p-2 text-sm ${index === 0 ? 'text-text font-semibold' : 'text-text-2'}`}
        >
          {data[header]}
        </td>
      ))}

      {/* Статичная колонка с действиями */}
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
