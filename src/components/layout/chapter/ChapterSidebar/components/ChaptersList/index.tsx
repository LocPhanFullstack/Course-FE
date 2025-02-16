import React from 'react'
import { Chapter } from '../Chapter'

interface ChapterListProps {
  section: ISection
  sectionProgress: ISectionProgress
  chapterId: string
  handleChapterClick: (sectionId: string, chapterId: string) => void
  updateChapterProgress: (sectionId: string, chapterId: string, completed: boolean) => void
}

export const ChaptersList = (props: ChapterListProps) => {
  const { chapterId, handleChapterClick, section, sectionProgress, updateChapterProgress } = props

  return (
    <ul className='chapters-sidebar__chapters'>
      {section.chapters.map((chapter, idx) => (
        <Chapter
          key={chapter.chapterId}
          chapter={chapter}
          index={idx}
          sectionId={section.sectionId}
          sectionProgress={sectionProgress}
          chapterId={chapterId}
          handleChapterClick={handleChapterClick}
          updateChapterProgress={updateChapterProgress}
        />
      ))}
    </ul>
  )
}
