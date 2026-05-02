import { cn } from '#/lib/utils'
import { tv, type VariantProps } from 'tailwind-variants'

const badge = tv({
  base: 'inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap w-fit transition-colors',
  variants: {
    variant: {
      // Основные цвета
      primary: 'bg-primary text-surface hover:bg-primary-dark',
      primarySoft: 'bg-primary-light text-primary-dark',

      // Второстепенные и нейтральные
      secondary: 'bg-surface-2 text-text-2 border border-border',
      outline:
        'text-text-2 border border-border hover:bg-surface-2 hover:text-text',
      ghost: 'bg-ghost text-text hover:bg-ghost-hover',

      // Статусы (мягкий фон + темный текст для читаемости + легкая рамка)
      success: 'bg-success-bg text-success-dark border border-success/20',
      warning: 'bg-warning-bg text-warning-dark border border-warning/20',
      danger: 'bg-danger-bg text-danger-dark border border-danger/20',
      info: 'bg-info-bg text-info-dark border border-info/20',

      // Статусы (яркие/солидные заливки, если нужны акценты)
      successSolid: 'bg-success text-surface',
      dangerSolid: 'bg-danger text-surface',
    },
  },
  defaultVariants: {
    variant: 'secondary',
  },
})

// Наследуем стандартные HTML-атрибуты для span и пропсы из tailwind-variants
interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {
  value?: string
  children?: React.ReactNode
}

export function Badge({
  className,
  variant,
  value,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badge({ variant }), className)} {...props}>
      {value || children}
    </span>
  )
}
