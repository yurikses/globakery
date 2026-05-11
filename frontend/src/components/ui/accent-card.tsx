import { cn } from '#/lib/utils'
import type { HTMLAttributes } from 'react'

interface AccentCardProps extends HTMLAttributes<HTMLDivElement> {
  color: "red" | "green" | "blue" | "yellow" | "purple";
  title: string
  details: string
  accentText: string
}

export function AccentCard({
  color = 'red',
  className,
  ...props
}: AccentCardProps) {
  
  const containerStyle: Record<typeof color, string> = {
    red: "border-l-red-600",
    green: "border-l-green-500",
    blue: "border-l-blue-500",
    yellow: "border-l-yellow-500",
    purple: "border-l-purple-500",
  }
   
  const textStyle = {
    red: "text-red-600",
    green: "text-green-500",
    blue: "text-blue-500",
    yellow: "text-yellow-500",
    purple: "text-purple-500",
  }
  
  

  return (
    <div className={cn(className, " border border-border bg-surface p-4 rounded-md border-l-4 flex flex-col justify-center gap-2", containerStyle[color], )}>
      <p className="uppercase text-text-2 font-semibold tracking-wide text-xs">{props.title}</p>
      <span className={cn(textStyle[color], "text-3xl font-semibold")}>{props.accentText}</span>
      <p className='text-xs'>{props.details}</p>
    </div>
  )
}
