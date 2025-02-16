import { cn } from '@/shared/utils/components'
import { CheckCircle, FileText } from 'lucide-react'
import React from 'react'

interface ChapterProps {
  chapter: IChapter
  index: number
  sectionId: string
  sectionProgress: ISectionProgress
  chapterId: string
  handleChapterClick: (sectionId: string, chapterId: string) => void
  updateChapterProgress: (section: string, chapterId: string, completed: boolean) => void
}

export const Chapter = (props: ChapterProps) => {
  const {
    chapter,
    chapterId,
    handleChapterClick,
    index,
    sectionId,
    sectionProgress,
    updateChapterProgress,
  } = props

  const chapterProgress = sectionProgress?.chapters.find((c) => c.chapterId === chapter.chapterId)
  const isCompleted = chapterProgress?.completed
  const isCurrentChapter = chapterId === chapter.chapterId

  const handleToggleComplete = (e: React.MouseEvent) => {
    e.stopPropagation()
    updateChapterProgress(sectionId, chapter.chapterId, !isCompleted)
  }

  return (
    <li
      className={cn('chapters-sidebar__chapter', {
        'chapters-sidebar__chapter-current': isCurrentChapter,
      })}
      onClick={() => handleChapterClick(sectionId, chapter.chapterId)}
    >
      {isCompleted ? (
        <div
          className='chapters-sidebar__chapter-check'
          onClick={handleToggleComplete}
          title='Toggle completion status'
        >
          <CheckCircle className='chapters-sidebar__check-icon' />
        </div>
      ) : (
        <div
          className={cn('chapters-sidebar__chapter-number', {
            'chapters-sidebar__chapter-number--current': isCurrentChapter,
          })}
        >
          {index + 1}
        </div>
      )}
      <span
        className={cn('chapters-sidebar__chapter-title', {
          'chapters-sidebar__chapter-title--completed': isCompleted,
          'chapters-sidebar__chapter-title--current': isCurrentChapter,
        })}
      >
        {chapter.title}
      </span>
      {chapter.type === 'Text' && <FileText className='chapters-sidebar__text-icon' />}
    </li>
  )
}
