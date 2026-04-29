import { Select } from 'radix-ui'
import { ChevronDown, ChevronUp, Check } from 'lucide-react'
import { useState } from 'react'
import { cn } from '#/lib/utils'

interface FactoriesSelectProps {}

export function FactoriesSelect(props: FactoriesSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedValue, setSelectedValue] = useState<string | null>(null)

  return (
    <Select.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      value={selectedValue ?? undefined}
      onValueChange={setSelectedValue}
    >
      <Select.Trigger className="flex h-10 w-50 items-center justify-between rounded-md border border-border bg-surface-2 px-3 py-2 text-sm text-text  transition-colors focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 data-[placeholder]:text-text-3">
        <Select.Value placeholder="Выберите завод" />
        <Select.Icon asChild>
          <ChevronDown className={cn(isOpen && "rotate-180","size-4 text-text-2 opacity-50 transition-all duration-200") } />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-96 min-w-[8rem] w-50 overflow-hidden rounded-md border border-border bg-surface-2 text-text shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          <Select.ScrollUpButton className="flex cursor-default items-center justify-center py-1 bg-surface text-text-2">
            <ChevronUp className="size-4" />
          </Select.ScrollUpButton>

          <Select.Viewport className="p-1">
            <Select.Group>
              <SelectItem value="factory-1">Завод 1</SelectItem>
              <SelectItem value="factory-2">Завод 2</SelectItem>
              <SelectItem value="factory-3">Завод 3</SelectItem>
            </Select.Group>
          </Select.Viewport>

          <Select.ScrollDownButton className="flex cursor-default items-center justify-center py-1 bg-surface text-text-2">
            <ChevronDown className="size-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

// Вспомогательный компонент для элемента списка
function SelectItem({
  children,
  value,
  ...props
}: {
  children: React.ReactNode
  value: string
}) {
  return (
    <Select.Item
      value={value}
      {...props}
      className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-surface-2 focus:text-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:font-medium data-[state=checked]:text-primary"
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="size-4 text-primary" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  )
}
