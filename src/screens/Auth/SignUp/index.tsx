'use client'

import { SignUp, useUser } from '@clerk/nextjs'
import React from 'react'
import { dark } from '@clerk/themes'
import { useSearchParams } from 'next/navigation'

export const SignUpScreen = () => {
  const searchParams = useSearchParams()
  const { user } = useUser()
  const isCheckoutPage = searchParams.get('showSignUp') !== null
  const courseId = searchParams.get('courseId')

  const signInUrl = isCheckoutPage
    ? `/checkout?step=1&courseId=${courseId}&showSignUp=false`
    : '/signin'

  const getRedirectUrl = () => {
    if (isCheckoutPage) {
      return `/checkout?step=2&courseId=${courseId}&showSignUp=false`
    }

    const userType = user?.publicMetadata?.userType as string
    if (userType === 'teacher') {
      return '/teacher/courses'
    } else if (userType === 'student') {
      return '/user/courses'
    }
    return '/'
  }

  return (
    <SignUp
      appearance={{
        baseTheme: dark,
        elements: {
          rootBox: 'flex justify-center items-center py-5',
          cardBox: 'shadow-none',
          card: {
            background: '#25262F',
            width: 'full',
            boxShadow: 'none',
          },
          footer: {
            background: '#25262F',
            padding: '0rem 2.5rem',
            '& > div > div:nth-child(1)': {
              background: '#25262F',
            },
          },
        },
      }}
      signInUrl={signInUrl}
      forceRedirectUrl={getRedirectUrl()}
      routing='hash'
      afterSignOutUrl='/'
    />
  )
}
