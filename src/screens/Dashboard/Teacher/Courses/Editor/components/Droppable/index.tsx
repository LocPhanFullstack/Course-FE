'use client'

import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { openChapterModal, setSections } from '@/state'
import { useAppSelector } from '@/state/redux'
import React from 'react'
import { useDispatch } from 'react-redux'
import { ChapterItem, SectionHeader } from './components'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

export const DroppableComponent = () => {
  const dispatch = useDispatch()
  const { sections } = useAppSelector((state) => state.global.courseEditor)

  const handleSectionDragEnd = (result: any) => {
    if (!result.destination) return

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const updatedSections = [...sections]
    const [reorderedSection] = updatedSections.splice(startIndex, 1)
    updatedSections.splice(endIndex, 0, reorderedSection)
    dispatch(setSections(updatedSections))
  }

  const handleChapterDragEnd = (result: any, sectionIndex: number) => {
    if (!result.destination) return

    const startIndex = result.source.index
    const endIndex = result.destination.index

    const updatedSections = [...sections]
    const updatedChapters = [...updatedSections[sectionIndex].chapters]

    const [reorderedSection] = updatedChapters.splice(startIndex, 1)
    updatedChapters.splice(endIndex, 0, reorderedSection)

    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      chapters: updatedChapters,
    }
    dispatch(setSections(updatedSections))
  }

  return (
    <DragDropContext onDragEnd={handleSectionDragEnd}>
      <Droppable droppableId='sections'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {sections.map((section: ISection, sectionIndex: number) => (
              <Draggable
                key={section.sectionId}
                draggableId={section.sectionId}
                index={sectionIndex}
              >
                {(draggableProvider) => (
                  <div
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    className={`droppable-section ${
                      sectionIndex % 2 === 0 ? 'droppable-section--even' : 'droppable-section--odd'
                    }`}
                  >
                    <SectionHeader
                      section={section}
                      sectionIndex={sectionIndex}
                      dragHandleProps={draggableProvider.dragHandleProps}
                    />

                    <DragDropContext
                      onDragEnd={(result) => handleChapterDragEnd(result, sectionIndex)}
                    >
                      <Droppable droppableId={`chapters-${section.sectionId}`}>
                        {(droppableProvider) => (
                          <div
                            ref={droppableProvider.innerRef}
                            {...droppableProvider.droppableProps}
                          >
                            {section.chapters.map((chapter: IChapter, chapterIndex: number) => (
                              <Draggable
                                key={chapter.chapterId}
                                draggableId={chapter.chapterId}
                                index={chapterIndex}
                              >
                                {(draggableProvider) => (
                                  <ChapterItem
                                    chapter={chapter}
                                    chapterIndex={chapterIndex}
                                    sectionIndex={sectionIndex}
                                    draggableProvider={draggableProvider}
                                  />
                                )}
                              </Draggable>
                            ))}
                            {droppableProvider.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    <Button
                      type='button'
                      variant='outline'
                      size='sm'
                      onClick={() =>
                        dispatch(
                          openChapterModal({
                            sectionIndex,
                            chapterIndex: null,
                          }),
                        )
                      }
                      className='add-chapter-button group'
                    >
                      <Plus className='add-chapter-button__icon' />
                      <span className='add-chapter-button__text'>Add Chapter</span>
                    </Button>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
