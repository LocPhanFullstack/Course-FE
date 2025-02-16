import { LoadingSpinner } from '@/components/loading'
import { useSidebar } from '@/components/ui/sidebar'
import { useCourseProgressData } from '@/shared/hooks/useCourseProgressData'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Section } from './components'

export const ChapterSidebar = () => {
  const router = useRouter()
  const sidebarRef = React.useRef<HTMLDivElement>(null)
  const { setOpen } = useSidebar()
  const [expandedSections, setExpandedSections] = React.useState<string[]>([])

  const { user, course, userProgress, chapterId, courseId, isLoading, updateChapterProgress } =
    useCourseProgressData()

  React.useEffect(() => {
    setOpen(false)
  }, [])

  if (isLoading) return <LoadingSpinner />
  if (!user) return <div>Please sign in to view course progress.</div>
  if (!course || !userProgress) return <div>Error loading course content</div>

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prevSections) =>
      prevSections.includes(sectionTitle)
        ? prevSections.filter((title) => title !== sectionTitle)
        : [...prevSections, sectionTitle],
    )
  }

  const handleChapterClick = (sectionId: string, chapterId: string) => {
    router.push(`/user/courses/${courseId}/chapters/${chapterId}`, {
      scroll: false,
    })
  }

  return (
    <div ref={sidebarRef} className='chapters-sidebar'>
      <div className='chapters-sidebar__header'>
        <h2 className='chapters-sidebar__title'>{course.title}</h2>
        <hr className='chapters-sidebar__divider' />
      </div>
      {course.sections.map((section, idx) => (
        <Section
          key={section.sectionId}
          section={section}
          index={idx}
          sectionProgress={
            userProgress.sections.find((s) => s.sectionId === section.sectionId) || {
              sectionId: section.sectionId,
              chapters: [],
            }
          }
          chapterId={chapterId as string}
          expandedSections={expandedSections}
          toggleSection={toggleSection}
          handleChapterClick={handleChapterClick}
          updateChapterProgress={updateChapterProgress}
        />
      ))}
    </div>
  )
}
