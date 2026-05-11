

export function UserSideInfo() {
  
  const user = {
    name: "Иван Иванов",
    factory: "Завод №1",
    role: "Администратор",
  }
  
  return (
    <div className="flex items-center gap-2">
      
      <div className="w-12 h-12 bg-amber-600 rounded-md"></div>

      <div className="flex flex-col ">
        <p className="text-surface">{ user.name }</p>
        <span className="text-text-3">{ user.role}</span>
      </div>
    </div>
  )
}