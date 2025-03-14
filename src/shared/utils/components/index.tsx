import { CourseFormData } from '@/configs/libs/schemas'
import clsx, { type ClassValue } from 'clsx'
import React from 'react'
import { toast } from 'sonner'
import { twMerge } from 'tailwind-merge'
import * as z from 'zod'

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

// Convert cents to formatted currency string (e.g., 4999 -> $49.99)
export const formatPrice = (cents: number | undefined): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format((cents || 0) / 100)
}

// Convert dollars to cents (e.g., "49.99" -> 4999)
export const dollarsToCents = (dollars: string | number): number => {
  const amount = typeof dollars === 'string' ? parseInt(dollars) : dollars
  return Math.round(amount * 100)
}

// Convert cents to dollar (e.g., 4999 -> 49.99)
export const centsToDollars = (cents: number | undefined): string => {
  return ((cents || 0) / 100).toString()
}

// Zod schema for price input (converts dollar input to cents)
export const priceSchema = z.string().transform((val) => {
  const dollars = parseFloat(val)
  if (isNaN(dollars)) return 0
  return dollarsToCents(dollars).toString()
})

export const convertToSubCurrency = (amount: number, factor: 100) => {
  return Math.round(amount * factor)
}

export const courseCategories = [
  { value: 'technology', label: 'Technology' },
  { value: 'science', label: 'Science' },
  { value: 'mathematics', label: 'Mathematics' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
] as const

export const createCourseFormData = (data: CourseFormData, sections: ISection[]): FormData => {
  const formData = new FormData()
  formData.append('title', data.courseTitle)
  formData.append('description', data.courseDescription)
  formData.append('category', data.courseCategory)
  formData.append('price', data.coursePrice)
  formData.append('status', data.courseStatus ? 'Published' : 'Draft')

  const sectionsWithVideos = sections.map((section) => ({
    ...section,
    chapters: section.chapters.map((chapter) => ({
      ...chapter,
      video: chapter.video,
    })),
  }))

  formData.append('sections', JSON.stringify(sectionsWithVideos))

  return formData
}

export const combineComponents = (components: React.ComponentType<any>[]) => {
  const CombinedComponent = components.reduce(
    (
      AccumulatedComponents: React.ComponentType<any>,
      CurrentComponent: React.ComponentType<any>,
    ) => {
      const WrappedComponent = ({ children, ...props }: React.ComponentProps<any>) => {
        return (
          <AccumulatedComponents {...props}>
            <CurrentComponent {...props}>{children}</CurrentComponent>
          </AccumulatedComponents>
        )
      }

      // Set display name for better debugging
      WrappedComponent.displayName = `Wrapped(${
        CurrentComponent.displayName || CurrentComponent.name
      })`

      return WrappedComponent
    },
    ({ children }: React.ComponentProps<any>) => <>{children}</>,
  )

  // Set display name for the combined component
  CombinedComponent.displayName = 'CombinedComponent'

  return CombinedComponent
}

export const uploadAllVideos = async (
  localSections: ISection[],
  courseId: string,
  getUploadVideoUrl: any,
) => {
  const updatedSections = localSections.map((section) => ({
    ...section,
    chapters: section.chapters.map((chapter) => ({
      ...chapter,
    })),
  }))

  for (let i = 0; i < updatedSections.length; i++) {
    for (let j = 0; j < updatedSections[i].chapters.length; j++) {
      const chapter = updatedSections[i].chapters[j]
      if (chapter.video instanceof File && chapter.video.type === 'video/mp4') {
        try {
          const updatedChapter = await uploadVideo(
            chapter,
            courseId,
            updatedSections[i].sectionId,
            getUploadVideoUrl,
          )
          updatedSections[i].chapters[j] = updatedChapter
        } catch (error) {
          console.error(`Failed to upload video for chapter ${chapter.chapterId}:`, error)
        }
      }
    }
  }

  return updatedSections
}

async function uploadVideo(
  chapter: IChapter,
  courseId: string,
  sectionId: string,
  getUploadVideoUrl: any,
) {
  const file = chapter.video as File

  try {
    const { uploadUrl, videoUrl } = await getUploadVideoUrl({
      courseId,
      sectionId,
      chapterId: chapter.chapterId,
      fileName: file.name,
      fileType: file.type,
    }).unwrap()

    await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': file.type,
      },
      body: file,
    })
    toast.success(`Video uploaded successfully for chapter ${chapter.chapterId}`)

    return { ...chapter, video: videoUrl }
  } catch (error) {
    console.error(`Failed to upload video for chapter ${chapter.chapterId}:`, error)
    throw error
  }
}
