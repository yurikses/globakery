import { Dialog } from 'radix-ui'
import { Button } from './button'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
}

export function ModalWindow(props: ModalProps) {
  return (
    <Dialog.Root open={props.open} onOpenChange={props.onOpenChange}>
      <Dialog.Trigger asChild>
        <Button variant="primary" className="">
          Edit profile
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 backdrop-blur-md" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md bg-surface p-6 w-full max-w-md">
          {props.title && (
            <Dialog.Title className="text-text font-semibold text-sm">
              {props.title}
            </Dialog.Title>
          )}

          {props.description && (
            <Dialog.Description className="text-text-2 mt-2 font-semibold text-sm">
              {props.description}
            </Dialog.Description>
          )}
          
          { props.children}
          
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
