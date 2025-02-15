'use client'

import { useUser } from '@clerk/nextjs'
import React from 'react'
import { LoadingSpinner } from '@/components/loading'
import { Sidebar } from '@/components/ui/sidebar'
import { SidebarContent, SidebarFooter, SidebarHeader } from './components'

export const AppSidebar = () => {
  const { user, isLoaded } = useUser()

  if (!isLoaded) return <LoadingSpinner />
  if (!user) return <div>User not found</div>

  return (
    <Sidebar
      collapsible='icon'
      style={{ height: '100vh' }}
      className='bg-customgreys-primarybg border-none shadow-lg'
    >
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter />
    </Sidebar>
  )
}
