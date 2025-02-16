import {
  useGetCourseQuery,
  useGetUserCourseProgressQuery,
  useUpdateUserCourseProgressMutation,
} from '@/state/api'
import { useUser } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import React from 'react'

export const useCourseProgressData = () => {
  const { courseId, chapterId } = useParams()
  const { user, isLoaded } = useUser()
  const [hasMarkedComplete, setHasMarkedComplete] = React.useState(false)
  const [updateProgress] = useUpdateUserCourseProgressMutation()

  const { data: course, isLoading: isCourseLoading } = useGetCourseQuery(
    (courseId as string) ?? '',
    { skip: !courseId },
  )

  const { data: userProgress, isLoading: isProgressLoading } = useGetUserCourseProgressQuery(
    {
      userId: user?.id ?? '',
      courseId: (courseId as string) ?? '',
    },
    { skip: !isLoaded || !user || !courseId },
  )

  const isLoading = !isLoaded || isCourseLoading || isProgressLoading

  const currentSection = course?.sections.find((section) =>
    section.chapters.some((chapter) => chapter.chapterId === chapterId),
  )

  const currentChapter = currentSection?.chapters.find((chapter) => chapter.chapterId === chapterId)

  const isChapterCompleted = () => {
    if (!currentSection || !currentChapter || !userProgress?.sections) return false

    const section = userProgress.sections.find(
      (section) => section.sectionId === currentSection.sectionId,
    )

    return (
      section?.chapters.some(
        (chapter) => chapter.chapterId === currentChapter.chapterId && chapter.completed,
      ) ?? false
    )
  }

  const updateChapterProgress = (sectionId: string, chapterId: string, completed: boolean) => {
    if (!user) return

    const updatedSections = [
      {
        sectionId,
        chapters: [
          {
            chapterId,
            completed,
          },
        ],
      },
    ]

    updateProgress({
      userId: user.id,
      courseId: (courseId as string) ?? '',
      progressData: {
        sections: updatedSections,
      },
    })
  }

  return {
    user,
    courseId,
    chapterId,
    course,
    userProgress,
    currentSection,
    currentChapter,
    isLoading,
    isChapterCompleted,
    updateChapterProgress,
    hasMarkedComplete,
    setHasMarkedComplete,
  }
}
