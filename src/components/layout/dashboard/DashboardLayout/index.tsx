'use client'

import { LoadingSpinner } from '@/components/loading'
import { cn } from '@/shared/utils/components'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { AppSidebar, Navbar } from '../../app'
import { usePathname, useRouter } from 'next/navigation'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ChapterSidebar } from '../../chapter'

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser()
  const [courseId, setCourseId] = React.useState<string | null>(null)
  const pathname = usePathname()
  const isCoursePage = /^\/user\/courses\/[^\/]+(?:\/chapters\/[^\/]+)?$/.test(pathname)

  React.useEffect(() => {
    if (isCoursePage) {
      const match = pathname.match(/\/user\/courses\/([^\/]+)/)
      setCourseId(match ? match[1] : null)
    } else {
      setCourseId(null)
    }
  }, [isCoursePage, pathname])

  if (!isLoaded) return <LoadingSpinner />
  if (!user) return <div>Please sign in to access this page.</div>

  return (
    <SidebarProvider>
      <div className='dashboard'>
        <AppSidebar />
        {/* Sidebar */}
        <div className='dashboard__content'>
          {courseId && <ChapterSidebar />}
          <div
            className={cn('dashboard__main', isCoursePage && 'dashboard__main--not-course')}
            style={{ height: '100vh' }}
          >
            <Navbar isCoursePage={isCoursePage} />
            <main className='dashboard__body'>{children}</main>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}
