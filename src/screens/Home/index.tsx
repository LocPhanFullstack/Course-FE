'use client'

import React from 'react'
import { Landing } from './components'
import { NonDashboardNavbar } from '@/components/layout/nondashboard'
import { Footer } from '@/components/layout/app'

export const HomeScreen = () => {
  return (
    <div className='nondashboard-layout'>
      <NonDashboardNavbar />
      <main className='nondashboard-layout__main'>
        <Landing />
      </main>
      <Footer />
    </div>
  )
}
