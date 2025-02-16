import { cn } from '@/shared/utils/components'
import { Trophy } from 'lucide-react'
import React from 'react'

interface ProgressVisualProps {
  section: ISection
  sectionProgress: ISectionProgress
  completedChapters: number
  totalChapters: number
}

export const ProgressVisual = (props: ProgressVisualProps) => {
  const { completedChapters, section, sectionProgress, totalChapters } = props

  return (
    <React.Fragment>
      <div className='chapters-sidebar__progress'>
        <div className='chapters-sidebar__progress-bars'>
          {section.chapters.map((chapter) => {
            const isCompleted = sectionProgress.chapters.find(
              (c) => c.chapterId === chapter.chapterId,
            )?.completed
            return (
              <div
                key={chapter.chapterId}
                className={cn(
                  'chapters-sidebar__progress-bar',
                  isCompleted && 'chapters-sidebar__progress-bar-completed',
                )}
              ></div>
            )
          })}
        </div>
        <div className='chapters-sidebar__trophy'>
          <Trophy className='chapters-sidebar__trophy-icon' />
        </div>
      </div>
      <p className='chapters-sidebar__progress-text'>
        {completedChapters}/{totalChapters} COMPLETED
      </p>
    </React.Fragment>
  )
}
