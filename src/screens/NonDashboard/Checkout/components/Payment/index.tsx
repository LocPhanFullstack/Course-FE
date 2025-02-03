import React from 'react'
import { StripeProvider } from './providers'
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { useCheckoutNavigation } from '@/shared/hooks/useCheckoutNavigation'
import { useClerk, useUser } from '@clerk/nextjs'
import { CoursePreview } from '../CheckoutDetails/components'
import { CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { LoadingSpinner } from '@/components/loading'
import { useCurrentCourse } from '@/shared/hooks/useCurrentCourse'
import { useCreateTransactionMutation } from '@/state/api'

const PaymentContent = () => {
  const stripe = useStripe()
  const elements = useElements()
  const { navigateToStep } = useCheckoutNavigation()
  const { course, courseId } = useCurrentCourse()
  const [createTransaction, isLoading] = useCreateTransactionMutation()
  const { user } = useUser()
  const { signOut } = useClerk()

  if (!course || !user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      toast.error('Stripe service is not available')
      return
    }

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_STRIPE_REDIRECT_URL}?courseId=${courseId}`,
      },
      redirect: 'if_required',
    })

    if (result.paymentIntent?.status === 'succeeded') {
      const transactionData: Partial<ITransaction> = {
        transactionId: result.paymentIntent.id,
        userId: user?.id,
        courseId,
        paymentProvider: 'stripe',
        amount: course.price || 0,
      }
      await createTransaction(transactionData)
      navigateToStep(3)
    }
  }

  const handleSignOutAndNavigate = async () => {
    await signOut()
    navigateToStep(1)
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <div className='payment'>
      <div className='payment__container'>
        {/* Order summary */}
        <div className='payment__preview'>
          <CoursePreview course={course} />
        </div>

        {/* Payment form */}
        <div className='payment__form-container'>
          <form id='payment-form' className='payment__form' onSubmit={handleSubmit}>
            <div className='payment__content'>
              <h1 className='payment__title'>Checkout</h1>
              <p className='payment__subtitle'>Fill out the payment details below to complete your purchase</p>

              <div className='payment__method'>
                <h3 className='payment__method-title'>Payment Method</h3>
                <div className='payment__card-container'>
                  <div className='payment__card-header'>
                    <CreditCard size={24} />
                    <span>Credit/Debit Card</span>
                  </div>
                  <div className='payment__card-element'>
                    <PaymentElement />
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Navigation Button */}
      <div className='payment__actions'>
        <Button className='hover:bg-white-50/10' variant='outline' type='button' onClick={handleSignOutAndNavigate}>
          Switch Account
        </Button>

        <Button form='payment-form' type='submit' className='payment__submit' disabled={!stripe || !elements}>
          Pay with Credit Card
        </Button>
      </div>
    </div>
  )
}

export const Payment = () => {
  return (
    <StripeProvider>
      <PaymentContent />
    </StripeProvider>
  )
}
