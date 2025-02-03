import { useGetCourseQuery } from '@/state/api'
import { useSearchParams } from 'next/navigation'

export const useCurrentCourse = () => {
  const searchParams = useSearchParams()
  const courseId = searchParams.get('courseId') ?? ''
  const { data: course, ...rest } = useGetCourseQuery(courseId)

  return { course, courseId, ...rest }
}
