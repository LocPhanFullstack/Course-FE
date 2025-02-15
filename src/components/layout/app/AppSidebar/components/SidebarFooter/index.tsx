import {
  SidebarFooter as SidebarFooterComponent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useClerk } from '@clerk/nextjs'
import { LogOut } from 'lucide-react'
import React from 'react'

export const SidebarFooter = () => {
  const { signOut } = useClerk()

  return (
    <SidebarFooterComponent>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <button onClick={() => signOut()} className='app-sidebar__signout'>
              <LogOut className='mr-2 h-6 w-6' />
              <span>Sign out</span>
            </button>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooterComponent>
  )
}
