'use client'

import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import React from 'react'
import { LoadingSpinner } from '@/components/loading'
import { Header } from '@/components/layout/app'
import { Button } from '@/components/ui/button'
import { TeacherCourseCard } from './components'
import { useCreateCourseMutation, useDeleteCourseMutation, useGetCoursesQuery } from '@/state/api'
import { Toolbar } from '@/screens/Dashboard/components'

export const TeacherCoursesSummaryScreen = () => {
  const router = useRouter()
  const { user } = useUser()
  const { data: courses, isLoading, isError } = useGetCoursesQuery({ category: 'all' })

  const [createCourse] = useCreateCourseMutation()
  const [deleteCourse] = useDeleteCourseMutation()

  const [searchTerm, setSearchTerm] = React.useState('')
  const [selectedCategory, setSelectedCategory] = React.useState('all')

  const filteredCourses = React.useMemo(() => {
    if (!courses) return []

    return courses.filter((course) => {
      const matchedSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchCategory = selectedCategory === 'all' || course.category === selectedCategory
      return matchedSearch && matchCategory
    })
  }, [courses, searchTerm, selectedCategory])

  const handleEdit = (course: ICourse) => {
    router.push(`/teacher/courses/${course.courseId}`, { scroll: false })
  }

  const handleDelete = async (course: ICourse) => {
    if (window.confirm('Are you sure you want to delete this course ?') && user) {
      await deleteCourse(course.courseId).unwrap()
    }
  }

  const handleCreateCourse = async () => {
    if (!user) return

    const result = await createCourse({
      teacherId: user.id,
      teacherName: user.fullName || 'Unknown teacher',
    }).unwrap()
    router.push(`/teacher/courses/${result.courseId}`)
  }

  if (isLoading) return <LoadingSpinner />
  if (isError || !courses) return <div>Error loading courses</div>
  if (!user) return <div>Please sign in to view your courses</div>

  return (
    <div className='teacher-courses'>
      <Header
        title='Courses'
        subtitle='Browse your courses'
        rightElement={
          <Button onClick={handleCreateCourse} className='teacher-courses__header'>
            Create Course
          </Button>
        }
      />
      <Toolbar onSearch={setSearchTerm} onCategoryChange={setSelectedCategory} />
      <div className='teacher-courses__grid'>
        {filteredCourses.map((course) => (
          <TeacherCourseCard
            key={course.courseId}
            course={course}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isOwner={course.teacherId === user.id}
          />
        ))}
      </div>
    </div>
  )
}
