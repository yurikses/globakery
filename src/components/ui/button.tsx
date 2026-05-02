import type { VariantProps } from 'tailwind-variants'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '#/lib/utils'
import { tv} from 'tailwind-variants'

const button = tv({
  base: ' rounded-md font-semibold transition-colors cursor-pointer text-sm ',
  variants: {
    variant: {
      primary: 'bg-primary text-surface hover:bg-primary-dark',
      secondary: 'bg-surface-2 text-text border border-border hover:text-primary hover:border-primary',
      danger: 'bg-danger text-surface hover:bg-danger-dark active:bg-danger-dark',
      ghost: 'bg-ghost text-text hover:bg-ghost-hover active:bg-ghost-active',
    },
    size: {
      icon: 'w-10 h-10 flex items-center justify-center',
      default: 'h-8 px-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'default',
  },
})

interface ButtonProps
  extends
    ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

export function Button({ variant, size, className, ...props }: ButtonProps) {
  return (
    <button className={cn(button({ variant, size }), className)} {...props} />
  )
}
