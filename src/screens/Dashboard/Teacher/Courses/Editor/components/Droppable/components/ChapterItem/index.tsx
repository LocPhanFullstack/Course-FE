'use client'

import { Button } from '@/components/ui/button'
import { deleteChapter, openChapterModal } from '@/state'
import { Edit, GripVertical, Trash2 } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

interface ChapterItemProps {
  chapter: IChapter
  chapterIndex: number
  sectionIndex: number
  draggableProvider: any
}

export const ChapterItem = (props: ChapterItemProps) => {
  const { chapterIndex, draggableProvider, chapter, sectionIndex } = props
  const dispatch = useDispatch()

  return (
    <div
      ref={draggableProvider.innerRef}
      {...draggableProvider.draggableProps}
      {...draggableProvider.dragHandleProps}
      className={`droppable-chapter ${
        chapterIndex % 2 === 1 ? 'droppable-chapter--odd' : 'droppable-chapter--even'
      }`}
    >
      <div className='droppable-chapter__title'>
        <GripVertical className='h-4 w-4 mb-[2px]' />
        <p className='text-sm'>{`${chapterIndex + 1}. ${chapter.title}`}</p>
      </div>
      <div className='droppable-chapter__actions'>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='droppable-chapter__button'
          onClick={() =>
            dispatch(
              openChapterModal({
                sectionIndex,
                chapterIndex,
              }),
            )
          }
        >
          <Edit className='h-4 w-4' />
        </Button>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          className='droppable-chapter__button'
          onClick={() =>
            dispatch(
              deleteChapter({
                sectionIndex,
                chapterIndex,
              }),
            )
          }
        >
          <Trash2 className='h-4 w-4' />
        </Button>
      </div>
    </div>
  )
}
