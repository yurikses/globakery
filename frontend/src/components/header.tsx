import { Select } from "@radix-ui/react-select";
import { useLocation } from "@tanstack/react-router"
import { FactoriesSelect } from "./ui/select";

export function AppHeader() {
  
  const title: Record<string, string> = {
    "/dashboard": "Главная",
    "/dashboard/factories": "Управление заводами",
    "": "Название по умолчанию"
  }
  const location = useLocation();
  
  return (
    <header className="w-full bg-surface border-b border-border p-4">
      <FactoriesSelect />
    </header>
  )
}