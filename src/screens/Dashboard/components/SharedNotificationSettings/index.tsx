'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateUserMutation } from '@/state/api'
import { useUser } from '@clerk/nextjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/app'
import { CustomFormField } from '@/components/custom'
import { NotificationSettingsFormData, notificationSettingsSchema } from '@/configs/libs/schemas'

interface SharedNotificationSettingsProps {
  title?: string
  subtitle?: string
}

export const SharedNotificationSettings = ({ title = 'Notification Settings', subtitle = 'Manage your notification settings' }: SharedNotificationSettingsProps) => {
  const { user } = useUser()
  const [updateUser] = useUpdateUserMutation()

  const currentSettings = (user?.publicMetadata as { settings?: IUserSettings })?.settings || {}

  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || 'daily',
    },
  })

  const onSubmit = async (data: NotificationSettingsFormData, refresh = false) => {
    if (!user) return

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        userType: user.publicMetadata.userType as 'student' | 'teacher',
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    }

    try {
      await updateUser(updatedUser)

      if (refresh) {
        window.location.reload()
      }
    } catch (error) {
      console.error('Failed to update user settings: ', error)
    }
  }

  if (!user) return <div>Please sign in to manage your settings.</div>

  return (
    <div className='notification-settings'>
      <Header title={title} subtitle={subtitle} />
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit((data) => onSubmit(data, true))} className='notification-settings__form'>
          <div className='notification-settings__fields'>
            <CustomFormField name='courseNotifications' label='Course Notifications' type='switch' />
            <CustomFormField name='emailAlerts' label='Email Alerts' type='switch' />
            <CustomFormField name='smsAlerts' label='SMS Alerts' type='switch' />

            <CustomFormField
              name='notificationFrequency'
              label='Notification Frequency'
              type='select'
              options={[
                { value: 'immediate', label: 'Immediate' },
                { value: 'daily', label: 'Daily' },
                { value: 'weekly', label: 'Weekly' },
              ]}
            />
          </div>

          <Button type='submit' className='notification-settings__submit'>
            Update Settings
          </Button>
        </form>
      </Form>
    </div>
  )
}
