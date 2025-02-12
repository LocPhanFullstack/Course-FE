'use client'

import { CustomFormField } from '@/components/custom'
import { Header } from '@/components/layout/app'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { CourseFormData, courseSchema } from '@/configs/libs/schemas'
import { centsToDollars, createCourseFormData } from '@/shared/utils/components'
import { openSectionModal, setSections } from '@/state'
import { useGetCourseQuery, useUpdateCourseMutation } from '@/state/api'
import { useAppDispatch, useAppSelector } from '@/state/redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { DroppableComponent as Droppable } from './components'
import { ChapterModal, SectionModal } from '@/components/modal'

export const CourseEditorScreen = () => {
  const router = useRouter()
  const params = useParams()
  const courseId = params.courseId as string
  const { data: course, isLoading, refetch } = useGetCourseQuery(courseId)
  const [updateCourse] = useUpdateCourseMutation()
  // Upload video functionality

  const dispatch = useAppDispatch()
  const { sections } = useAppSelector((state) => state.global.courseEditor)

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

  const onSubmit = async (data: CourseFormData) => {
    try {
      // const updatedSections = await uploadAllVideos(sections, id, getUploadVideoUrl)

      const formData = createCourseFormData(data, [])

      await updateCourse({
        courseId,
        formData,
      }).unwrap()

      refetch()
    } catch (error) {
      console.error('Failed to update course:', error)
    }
  }

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
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                  labelClassName={`text-sm font-medium ${
                    methods.watch('courseStatus') ? 'text-green-500' : 'text-yellow-500'
                  }`}
                  inputClassName='data-[state=checked]:bg-green-500'
                />
                <Button type='submit' className='bg-primary-700 hover:bg-primary-600'>
                  {methods.watch('courseStatus') ? 'Update Published Course' : 'Save Draft'}
                </Button>
              </div>
            }
          />

          <div className='flex justify-between md:flex-row flex-col gap-10 mt-5 font-dm-sans'>
            <div className='basis-1/2'>
              <div className='space-y-4'>
                <CustomFormField
                  name='courseTitle'
                  label='Course Title'
                  type='text'
                  placeholder='Write course title here'
                  className='border-none'
                  initialValue={course?.title}
                />

                <CustomFormField
                  name='courseDescription'
                  label='Course Description'
                  type='textarea'
                  placeholder='Write course description here'
                  className='border-none'
                  initialValue={course?.description}
                />

                <CustomFormField
                  name='courseCategory'
                  label='Course Category'
                  type='select'
                  placeholder='Select category here'
                  options={[
                    { value: 'technology', label: 'Technology' },
                    { value: 'science', label: 'Science' },
                    { value: 'mathematics', label: 'Mathematics' },
                    { value: 'Artifical Intelligence', label: 'Artifical Intelligence' },
                  ]}
                  initialValue={course?.category}
                />

                <CustomFormField
                  name='coursePrice'
                  label='Course Price'
                  type='number'
                  placeholder='0'
                  initialValue={course?.price}
                />
              </div>
            </div>

            <div className='bg-customgreys-darkGrey mt-4 md:mt-0 p-4 rounded-lg basis-1/2'>
              <div className='flex justify-between items-center mb-2'>
                <h2 className='text-2xl font-semibold text-secondary-foreground'>Section</h2>

                <Button
                  type='button'
                  variant={'outline'}
                  size='sm'
                  onClick={() => dispatch(openSectionModal({ sectionIndex: null }))}
                  className='border-none text-primary-700 group'
                >
                  <Plus className='mr-1 h-4 w-4 text-primary-700 group-hover:text-white-100' />
                  <span className='text-primary-700 group-hover:text-white-100'>Add Section</span>
                </Button>
              </div>

              {isLoading ? (
                <p>Loading course content...</p>
              ) : sections.length > 0 ? (
                <Droppable />
              ) : (
                <p>No sections available</p>
              )}
            </div>
          </div>
        </form>
      </Form>

      <ChapterModal />
      <SectionModal />
    </React.Fragment>
  )
}
