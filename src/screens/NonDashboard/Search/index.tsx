'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { LoadingSpinner } from '@/components/loading'
import { motion } from 'framer-motion'
import { CourseCardSearch } from '@/components/course'
import { SelectedCourse } from './components'
import { useGetCoursesQuery } from '@/state/api'

export const SearchScreen = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const courseId = searchParams.get('courseId')
  const { data: courses, isLoading, isError } = useGetCoursesQuery({})
  const [selectedCourse, setSelectedCourse] = React.useState<ICourse | null>(null)

  React.useEffect(() => {
    if (courses) {
      if (courseId) {
        const course = courses.find((c) => c.courseId === courseId)
        setSelectedCourse(course || courses[0])
      } else {
        setSelectedCourse(courses[0])
      }
    }
  }, [courses, courseId])

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div>Failed to fetch courses!!!</div>

  const handleCourseSelect = (course: ICourse) => {
    setSelectedCourse(course)
    router.push(`/search?courseId=${course.courseId}`)
  }

  const handleEnrollNow = (courseId: string) => {
    router.push(`/checkout?step=1&courseId=${courseId}&showSignUp=false`)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className='search'>
      <h1 className='search__title'>List of available courses</h1>
      <h2 className='search__subtitle'>{courses?.length} courses available</h2>
      <div className='search__content'>
        <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className='search__courses-grid'>
          {courses?.map((course) => (
            <CourseCardSearch key={course.courseId} course={course} isSelected={selectedCourse?.courseId === course.courseId} onClick={() => handleCourseSelect(course)} />
          ))}
        </motion.div>

        {selectedCourse && (
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className='search__selected-course'>
            <SelectedCourse course={selectedCourse} handleEnrollNow={handleEnrollNow} />
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
