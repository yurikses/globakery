import { cn } from '#/lib/utils'
import type { InputHTMLAttributes } from 'react'
import type { ClassValue } from 'tailwind-variants'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ className, label, error,  ...props }: InputProps) {
  const inputStyle: ClassValue =
    'border border-border text-sm bg-surface rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-50'

  return (
    <label className='flex flex-col gap-1'>
      { label && <span className="block text-xs  text-text-2 font-semibold mb-1 uppercase tracking-wide">{label}</span> }
      <input className={cn(inputStyle, className)} {...props} />
      { error && <span className="block text-xs text-red-600 mt-0.5">{error}</span> }
    </label>
  )
}
