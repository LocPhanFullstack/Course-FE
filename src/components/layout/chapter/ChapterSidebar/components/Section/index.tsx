import { ChevronDown, ChevronUp } from 'lucide-react'
import { ProgressVisual } from '../ProgressVisual'
import { ChaptersList } from '../ChaptersList'

interface SectionProps {
  section: ISection
  index: number
  sectionProgress: ISectionProgress
  chapterId: string
  expandedSections: string[]
  toggleSection: (sectionTitle: string) => void
  handleChapterClick: (sectionId: string, chapterId: string) => void
  updateChapterProgress: (sectionId: string, chapterId: string, completed: boolean) => void
}

export const Section = (props: SectionProps) => {
  const {
    chapterId,
    expandedSections,
    handleChapterClick,
    index,
    section,
    sectionProgress,
    toggleSection,
    updateChapterProgress,
  } = props

  const completedChapters =
    sectionProgress?.chapters.filter((chapter) => chapter.completed).length || 0
  const totalChapters = section.chapters.length
  const isExpanded = expandedSections.includes(section.sectionTitle)

  return (
    <div className='chapters-sidebar__section'>
      <div
        onClick={() => toggleSection(section.sectionTitle)}
        className='chapters-sidebar__section-header'
      >
        <div className='chapters-sidebar__section-title-wrapper'>
          <p className='chapters-sidebar__section-number'>Section 0{index + 1}</p>
          {isExpanded ? (
            <ChevronUp className='chapters-sidebar__chevron' />
          ) : (
            <ChevronDown className='chapters-sidebar__chevron' />
          )}
        </div>
        <h3 className='chapters-sidebar__section-title'>{section.sectionTitle}</h3>
      </div>
      <hr className='chapters-sidebar__divider' />

      {isExpanded && (
        <div className='chapters-sidebar__section-content'>
          <ProgressVisual
            section={section}
            sectionProgress={sectionProgress}
            completedChapters={completedChapters}
            totalChapters={totalChapters}
          />
          <ChaptersList
            section={section}
            sectionProgress={sectionProgress}
            chapterId={chapterId}
            handleChapterClick={handleChapterClick}
            updateChapterProgress={updateChapterProgress}
          />
        </div>
      )}
      <hr className='chapters-sidebar__divider' />
    </div>
  )
}
