import React from 'react'

interface CustomModalProps {
  onClose: () => void
  isOpen: boolean
  children: React.ReactNode
}

export const CustomModal = (props: CustomModalProps) => {
  if (!props.isOpen) return null

  return (
    <React.Fragment>
      <div className='custom-modal__overlay' onClick={props.onClose} />
      <div className='custom-modal__content'>
        <div className='custom-modal__inner'>{props.children}</div>
      </div>
    </React.Fragment>
  )
}
