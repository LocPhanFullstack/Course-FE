"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { useForm } from "react-hook-form";
import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from "@/configs/libs/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Header } from "@/components/layout/app";
import { CustomFormField } from "@/components/custom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/loading";
import { useAPIUpdateUser } from "@/shared/apis";

interface SharedNotificationSettingsProps {
  title?: string;
  subtitle?: string;
}

export const SharedNotificationSettings = (
  props: SharedNotificationSettingsProps
) => {
  const { title, subtitle } = props;

  const { user, isLoaded } = useUser();
  const apiUpdateUser = useAPIUpdateUser();

  const currentSettings =
    (user?.publicMetadata as { settings?: IUserSettings })?.settings || {};

  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || "daily",
    },
  });

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    };
    // console.log("Updated User Data:", updatedUser);

    try {
      await apiUpdateUser.mutate(updatedUser);
    } catch (error: any) {
      toast.error("Failed to update user settings: ", error);
    }
  };

  if (!isLoaded || apiUpdateUser.isPending) return <LoadingSpinner />;
  if (!user) return <div>Please sign in to manage your settings</div>;

  return (
    <div className="notification-settings">
      <Header title={title} subtitle={subtitle} />
      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="notification-settings__form"
        >
          <div className="notification-settings__fields">
            <CustomFormField
              name="courseNotifications"
              label="Course Notifications"
              type="switch"
            />
            <CustomFormField
              name="emailAlerts"
              label="Email Alerts"
              type="switch"
            />
            <CustomFormField
              name="smsAlerts"
              label="SMS Alerts"
              type="switch"
            />
            <CustomFormField
              name="notificationFrequency"
              label="Notification Frequency"
              type="select"
              options={[
                { value: "immediate", label: "Immediate" },
                { value: "daily", label: "Daily" },
                { value: "weekly", label: "Weekly" },
              ]}
            />
          </div>

          <Button type="submit" className="notification-settings__submit">
            Update Settings
          </Button>
        </form>
      </Form>
    </div>
  );
};
