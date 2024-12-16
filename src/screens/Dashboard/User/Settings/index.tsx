import { SharedNotificationSettings } from "../../components";

export const SettingsScreen = () => {
  return (
    <div className="w-3/5">
      <SharedNotificationSettings
        title="User Settings"
        subtitle="Manage your user notification settings"
      />
    </div>
  );
};
