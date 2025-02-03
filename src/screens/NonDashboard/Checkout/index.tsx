'use client'

import { LoadingSpinner } from '@/components/loading'
import { useUser } from '@clerk/nextjs'
import { CheckoutDetails, Completion, Payment, WizardStepper } from './components'
import { useCheckoutNavigation } from '@/shared/hooks/useCheckoutNavigation'
import React from 'react'

export const CheckoutScreen = () => {
  const { isLoaded } = useUser()
  const { checkoutStep } = useCheckoutNavigation()

  if (!isLoaded) return <LoadingSpinner />

  const renderStep = () => {
    switch (checkoutStep) {
      case 1:
        return <CheckoutDetails />
      case 2:
        return <Payment />
      case 3:
        return <Completion />
      default:
        return 'checkout details page'
    }
  }

  return (
    <div className='checkout'>
      <WizardStepper currentStep={checkoutStep} />
      <div className='checkout__content'>{renderStep()}</div>
    </div>
  )
}
