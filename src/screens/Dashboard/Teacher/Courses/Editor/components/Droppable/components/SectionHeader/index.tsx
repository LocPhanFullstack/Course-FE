'use client'

import { Button } from '@/components/ui/button'
import { deleteSection, openSectionModal } from '@/state'
import { Edit, GripVertical, Trash2 } from 'lucide-react'
import React from 'react'
import { useDispatch } from 'react-redux'

interface SectionHeaderProps {
  section: ISection
  sectionIndex: number
  dragHandleProps: any
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { section, sectionIndex, dragHandleProps } = props
  const dispatch = useDispatch()

  return (
    <div className='droppable-section__header' {...dragHandleProps}>
      <div className='droppable-section__title-wrapper'>
        <div className='droppable-section__title-container'>
          <div className='droppable-section__title'>
            <GripVertical className='h-6 w-6 mb-1' />
            <h3 className='text-lg font-medium'>{section.sectionTitle}</h3>
          </div>
          <div className='droppable-chapter__actions'>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='p-0'
              onClick={() => dispatch(openSectionModal({ sectionIndex }))}
            >
              <Edit className='h-5 w-5' />
            </Button>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='p-0'
              onClick={() => dispatch(deleteSection(sectionIndex))}
            >
              <Trash2 className='h-5 w-5' />
            </Button>
          </div>
        </div>
        {section.sectionDescription && (
          <p className='droppable-section__description'>{section.sectionDescription}</p>
        )}
      </div>
    </div>
  )
}
