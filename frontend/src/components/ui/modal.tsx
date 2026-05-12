import { Dialog } from 'radix-ui'
import { Button } from './button'
import { X } from 'lucide-react'
import type { VariantProps } from 'tailwind-variants'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
  buttonText?: string
  className?: string
  buttonVariant?: VariantProps<typeof Button>['variant']
  buttonSize?: VariantProps<typeof Button>['size']
}

export function ModalWindow(props: ModalProps) {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Trigger asChild className={props.className}>
        <Button variant={props.buttonVariant ?? 'primary'} size={props.buttonSize ?? 'default'} className="" >
          {props.buttonText ?? ''}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-surface p-6 w-full max-w-md">
          {props.title && (
            <Dialog.Title className="text-text font-semibold  flex justify-between items-center">
              {props.title}
              <Button variant='ghost' size='icon' className='p-2 ' onClick={()=>props.onOpenChange(false)}>
                <X className='size-6'/>
              </Button>
            </Dialog.Title>
          )}

          {props.description && (
            <Dialog.Description className="text-text-2  font-semibold text-sm">
              {props.description}
            </Dialog.Description>
          )}
          
          {props.children}
          
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
