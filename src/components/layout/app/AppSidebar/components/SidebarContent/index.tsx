import {
  SidebarContent as SidebarContentComponent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/shared/utils/components'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { navLinks } from '../../data'

export const SidebarContent = () => {
  const { user } = useUser()
  const pathname = usePathname()

  const userType = (user?.publicMetadata.userType as 'student' | 'teacher') || 'student'
  const currentNavLinks = navLinks[userType]
  return (
    <SidebarContentComponent>
      <SidebarMenu className='app-sidebar__nav-menu'>
        {currentNavLinks.map((link) => {
          const isActive = pathname.startsWith(link.href)
          return (
            <SidebarMenuItem
              key={link.href}
              className={cn('app-sidebar__nav-item', isActive && 'bg-gray-800')}
            >
              <SidebarMenuButton
                asChild
                size='lg'
                className={cn('app-sidebar__nav-button', !isActive && 'text-customgreys-dirtyGrey')}
              >
                <Link href={link.href} className='app-sidebar__nav-link' scroll={false}>
                  <link.icon className={isActive ? 'text-white-50' : 'text-gray-500'} />
                  <span
                    className={cn(
                      'app-sidebar__nav-text',
                      isActive ? 'text-white-50' : 'text-gray-500',
                    )}
                  >
                    {link.label}
                  </span>
                </Link>
              </SidebarMenuButton>
              {isActive && <div className='app-sidebar__active-indicator' />}
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarContentComponent>
  )
}
