export function PageTitle({
  title,
  details,
}: {
  title: string
  details?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-semibold text-text">{title}</h1>
      {details && <p className=" text-text-2">{details}</p>}
    </div>
  )
}
