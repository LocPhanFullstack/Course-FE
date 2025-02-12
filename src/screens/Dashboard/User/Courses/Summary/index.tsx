'use client'

import { Header } from '@/components/layout/app'
import { LoadingSpinner } from '@/components/loading'
import { Toolbar } from '@/screens/Dashboard/components'
import { useGetUserEnrolledCoursesQuery } from '@/state/api'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import { UserCourseCard } from './components'

export const UserCoursesSummaryScreen = () => {
  const router = useRouter()
  const { user, isLoaded } = useUser()
  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')

  const {
    data: courses,
    isLoading,
    isError,
  } = useGetUserEnrolledCoursesQuery(user?.id ?? '', { skip: !isLoaded || !user })

  const filteredCourses = React.useMemo(() => {
    if (!courses) return []

    return courses.filter((course) => {
      const matchsSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchsCategory = selectedCategory === 'all' || course.category === selectedCategory
      return matchsCategory && matchsSearch
    })
  }, [courses, searchTerm, selectedCategory])

  const handleGotoCourse = (course: ICourse) => {
    if (course.sections && course.sections.length > 0 && course.sections[0].chapters.length > 0) {
      const firstChapter = course.sections[0].chapters[0]
      router.push(`courses/${course.courseId}/chapters/${firstChapter.chapterId}`, {
        scroll: false,
      })
    } else {
      router.push(`user/courses/${course.courseId}`, { scroll: false })
    }
  }

  if (!isLoaded || isLoading) return <LoadingSpinner />
  if (!user) return <div>Please sign in to view your courses.</div>
  if (isError || !courses || courses.length === 0)
    return <div>You are not enrolled in any courses yet.</div>

  return (
    <div className='user-courses'>
      <Header title='My courses' subtitle='View your enrolled courses' />
      <Toolbar onSearch={setSearchTerm} onCategoryChange={setSelectedCategory} />
      <div className='user-courses__grid'>
        {filteredCourses.map((course) => (
          <UserCourseCard key={course.courseId} course={course} onGoToCourse={handleGotoCourse} />
        ))}
      </div>
    </div>
  )
}
