import { cn } from '#/lib/utils'
import { Link, useLocation, type LinkProps } from '@tanstack/react-router'
import type { LucideIcon } from 'lucide-react'
import type { JSX } from 'react'


interface SideBarLinkProps extends LinkProps {
  icon: LucideIcon
  text: React.ReactNode
  className?: string
}

export function SideBarLink({ to, icon: Icon, text, className }: SideBarLinkProps) {

  const location = useLocation()
  const isActive = location.pathname === to

  const linkStyles = {
    hover: 'hover:bg-primary/20 border-l-2 hover:border-l-primary border-transparent',
    default: 'bg-transparent flex items-center gap-2 px-4 py-2 rounded-md transition-colors text-primary-light',
    active: 'bg-primary/20 border-l-2 border-l-primary',
  }

  return (
    <Link to={to} className={cn(className, linkStyles.hover, linkStyles.default, isActive && linkStyles.active)}>
      {<Icon className='size-4'/>}
      {text}
    </Link>
  )
}

export function SideBarSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs font-bold text-text-2 uppercase tracking-wider px-4 ">{title}</h3>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  )
}
