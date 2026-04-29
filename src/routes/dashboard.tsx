import { UserSideInfo } from '#/components/auth/user-sidebar'
import { SideBarLink, SideBarSection } from '#/components/ui/sidebar-elems'
import { createFileRoute, Outlet, Link } from '@tanstack/react-router'
import { HomeIcon, Factory } from 'lucide-react'

export const Route = createFileRoute('/dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-bg">

      <aside className="w-64 bg-sidebar border-r border-border  p-2 flex flex-col gap-6 shadow-sm">
        <div className="flex gap-3 items-center p-2 ">
          <div className='w-12 h-12 bg-amber-200 rounded-md'>
          </div>
          <div className=" flex flex-col gap-1 ">
            <h2 className='font-semibold text-surface'>Globakery</h2>
            <span className='text-text-3'>Учет хлебзаводов</span>
          </div>
        </div>
        <SideBarSection title="Основное">
          <SideBarLink to="/dashboard" icon={HomeIcon} text="Главная" />
          <SideBarLink to="/dashboard/factories" icon={Factory} text="Заводы" />
        </SideBarSection>
        
        <div className='mt-auto p-2'>
          <UserSideInfo/>
        </div>
        
      </aside>

      
      <main className="flex-1  bg-surface-2">
        <Outlet />
      </main>
    </div>
  )
}
