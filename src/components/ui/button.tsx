import type { VariantProps } from 'tailwind-variants'
import type { ButtonHTMLAttributes } from 'react'
import { cn } from '#/lib/utils'
import { tv} from 'tailwind-variants'

const button = tv({
  base: ' rounded-md font-semibold transition-colors cursor-pointer text-sm ',
  variants: {
    variant: {
      primary: 'bg-primary text-surface hover:bg-primary-dark',
      secondary: 'bg-secondary text-surface hover:bg-secondary',
      danger: 'bg-red-600 text-surface hover:bg-red-700',
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
