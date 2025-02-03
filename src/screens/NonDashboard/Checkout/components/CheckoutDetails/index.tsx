'use client'

import { useSearchParams } from 'next/navigation'
import React from 'react'
import { LoadingSpinner } from '@/components/loading'
import { CoursePreview } from './components'
import { GuestFormData, guestSchema } from '@/configs/libs/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { CustomFormField } from '@/components/custom'
import { Button } from '@/components/ui/button'
import { SignInScreen } from '@/screens/Auth/SignIn'
import { SignUpScreen } from '@/screens/Auth/SignUp'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useCurrentCourse } from '@/shared/hooks/useCurrentCourse'

export const CheckoutDetails = () => {
  const searchParams = useSearchParams()
  const showSignUp = searchParams.get('showSignUp') === 'true'
  const { course: selectedCourse, isLoading, isError } = useCurrentCourse()

  const methods = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: {
      email: '',
    },
  })

  if (isLoading) return <LoadingSpinner />
  if (isError) return <div>Failed to fetch course data</div>
  if (!selectedCourse) return <div>Course not found</div>

  return (
    <div className='checkout-details'>
      <div className='checkout-details__container'>
        <div className='checkout-details__preview'>
          <CoursePreview course={selectedCourse} />
        </div>

        {/* STRETCH FEATURE */}
        <div className='checkout-details__options'>
          <div className='checkout-details__guest'>
            <h2 className='checkout-details__title'>Guest Checkout</h2>
            <p className='checkout-details__subtitle'>Enter email to receive course access details and order confirmation. You can create an account after purchase.</p>
            <Form {...methods}>
              <form
                onSubmit={methods.handleSubmit((data) => {
                  console.log(data)
                })}
                className='checkout-details__form'
              >
                <CustomFormField name='email' label='Email address' type='email' className='w-full rounded mt-4' labelClassName='font-normal text-white-50' inputClassName='py-3' />
                <Button type='submit' className='checkout-details__submit'>
                  Continue as Guest
                </Button>
              </form>
            </Form>
          </div>

          <div className='checkout-details__divider'>
            <hr className='checkout-details__divider-line' />
            <span className='checkout-details__divider-text'>Or</span>
            <hr className='checkout-details__divider-line' />
          </div>

          <div className='checkout-details__auth'>{showSignUp ? <SignUpScreen /> : <SignInScreen />}</div>
        </div>
      </div>
    </div>
  )
}
