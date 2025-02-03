import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe, Appearance, StripeElementsOptions } from '@stripe/stripe-js'
import { LoadingSpinner } from '@/components/loading'
import { useCurrentCourse } from '@/shared/hooks/useCurrentCourse'
import { useCreateStripePaymentIntentMutation } from '@/state/api'

if (!process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not set')
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)

const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#0570de',
    colorBackground: '#18181b',
    colorText: '#d2d2d2',
    colorDanger: '#df1b41',
    colorTextPlaceholder: '#6e6e6e',
    fontFamily: 'Inter, system-ui, sans-serif',
    spacingUnit: '3px',
    borderRadius: '10px',
    fontSizeBase: '14px',
  },
}

export const StripeProvider = ({ children }: { children: React.ReactNode }) => {
  const [clientSecret, setClientSecret] = React.useState<string | undefined>('')
  const [createStripePaymentIntent] = useCreateStripePaymentIntentMutation()
  const { course } = useCurrentCourse()

  React.useEffect(() => {
    if (!course) return
    const fetchPaymentIntent = async () => {
      const result = await createStripePaymentIntent({
        amount: course?.price ?? 9999999999999,
      }).unwrap()

      setClientSecret(result.clientSecret)
    }

    fetchPaymentIntent()
  }, [createStripePaymentIntent, course?.price, course])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance,
  }

  if (!clientSecret) return <LoadingSpinner />

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  )
}
