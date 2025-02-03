'use client'

import { CustomFormField } from '@/components/custom'
import { Header } from '@/components/layout/app'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { CourseFormData, courseSchema } from '@/configs/libs/schemas'
import { centsToDollars } from '@/shared/utils/components'
import { setSections } from '@/state'
import { useGetCourseQuery } from '@/state/api'
import { useAppDispatch, useAppSelector } from '@/state/redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

export const CourseEditor = () => {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { data: course } = useGetCourseQuery(id)
  // const [updateCourse] = useUpdateCourseMutation()
  // Upload video functionality

  const dispatch = useAppDispatch()
  const { sections } = useAppSelector((state) => state.global.courseEditor)
  console.log(sections)

  const methods = useForm<CourseFormData>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseTitle: '',
      courseCategory: '',
      courseDescription: '',
      coursePrice: '0',
      courseStatus: false,
    },
  })

  React.useEffect(() => {
    if (course) {
      methods.reset({
        courseTitle: course.title,
        courseCategory: course.category,
        courseDescription: course.description,
        coursePrice: centsToDollars(course.price),
        courseStatus: course.status === 'Published',
      })
      dispatch(setSections(course.sections || []))
    }
  }, [course, methods])

  // const onSubmit = async (data: CourseFormData) => {
  //   try {
  //     const formData = createCourseFormData(data, sections)

  //     await apiUpdateCourse.mutate({ courseId: id, updateData: formData })
  //   } catch (error) {
  //     console.error('Failed to update course: ', error)
  //   }
  // }

  return (
    <React.Fragment>
      <div className='flex items-center gap-5 mb-5'>
        <button
          className='flex items-center border border-customgreys-dirtyGrey rounded-lg p-2 gap-2 cursor-pointer hover:bg-customgreys-dirtyGrey hover:text-white-100 text-customgreys-dirtyGrey'
          onClick={() => router.push('/teacher/courses')}
        >
          <ArrowLeft className='w-4 h-4' />
          <span>Back to Courses</span>
        </button>
      </div>

      <Form {...methods}>
        <form>
          <Header
            title='Course Setup'
            subtitle='Complete all fields and save your course'
            rightElement={
              <div className='flex items-center space-x-4'>
                <CustomFormField
                  name='courseStatus'
                  label={methods.watch('courseStatus') ? 'Published' : 'Draft'}
                  type='switch'
                  className='flex items-center space-x-2'
                  labelClassName={`text-sm font-medium ${methods.watch('courseStatus') ? 'text-green-500' : 'text-yellow-500'}`}
                  inputClassName='data-[state=checked]:bg-green-500'
                />
                <Button type='submit' className='bg-primary-700 hover:bg-primary-600'>
                  {methods.watch('courseStatus') ? 'Update Published Course' : 'Save Draft'}
                </Button>
              </div>
            }
          ></Header>
        </form>
      </Form>
    </React.Fragment>
  )
}
