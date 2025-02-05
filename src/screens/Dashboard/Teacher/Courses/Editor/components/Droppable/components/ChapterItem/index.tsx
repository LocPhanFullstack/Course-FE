'use client'

import { GripVertical } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

interface ChapterItemProps {
  chapter: IChapter
  chapterIndex: number
  sectionIndex: number
  draggableProvider: any
}

export const ChapterItem = (props: ChapterItemProps) => {
  const { chapterIndex, draggableProvider } = props

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
      </div>
    </div>
  )
}
