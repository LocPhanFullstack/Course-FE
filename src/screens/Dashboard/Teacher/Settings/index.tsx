import { SharedNotificationSettings } from "../../components";

export const SettingsScreen = () => {
  return (
    <div className="w-3/5">
      <SharedNotificationSettings
        title="Teacher Settings"
        subtitle="Manage your teacher notification settings"
      />
    </div>
  );
};
