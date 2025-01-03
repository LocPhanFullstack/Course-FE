import { DashboardLayout } from "@/components/layout/dashboard";
import { CoursesSummary } from "@/screens/Dashboard/Teacher/Courses/Summary";

export default function TeacherProfile() {
  return (
    <DashboardLayout>
      <CoursesSummary />
    </DashboardLayout>
  );
}
