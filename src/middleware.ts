import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { clerkClient } from '@clerk/clerk-sdk-node'

const isStudentRoute = createRouteMatcher(['/user/(.*)'])
const isTeacherRoute = createRouteMatcher(['/teacher/(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (req.url.includes('/signin') || req.url.includes('/signup')) {
    return NextResponse.next()
  }
  const { sessionClaims } = await auth()

  if (!sessionClaims) {
    console.log('User not authenticated, redirecting to signin')
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  const userId = sessionClaims.sub
  const user = await clerkClient.users.getUser(userId)
  if (!user.publicMetadata.settings) {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          smsAlerts: false,
          emailAlerts: false,
          courseNotifications: false,
          notificationFrequency: 'daily',
        },
      },
    })
  }
  await clerkClient.users.updateUserMetadata(userId, {
    publicMetadata: {
      userType: user.publicMetadata.userType ?? 'student',
    },
  })
  const userRole = await user.publicMetadata.userType

  // Role-based route matching and redirection
  if (isStudentRoute(req)) {
    if (userRole !== 'student') {
      const url = new URL('/teacher/courses', req.url)
      return NextResponse.redirect(url)
    }
  }

  if (isTeacherRoute(req)) {
    if (userRole !== 'teacher') {
      const url = new URL('/user/courses', req.url)
      return NextResponse.redirect(url)
    }
  }

  // If everything is fine, continue with the request
  return NextResponse.next()
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}
