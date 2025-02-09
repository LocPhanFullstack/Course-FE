import { DashboardLayout } from '@/components/layout/dashboard'
import { TeacherCoursesSummary } from '@/screens/Dashboard/Teacher/Courses/Summary'

export default function TeacherProfile() {
  return (
    <DashboardLayout>
      <TeacherCoursesSummary />
    </DashboardLayout>
  )
}
