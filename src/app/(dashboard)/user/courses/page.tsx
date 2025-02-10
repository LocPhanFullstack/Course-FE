import { DashboardLayout } from '@/components/layout/dashboard'
import { UserCoursesSummary } from '@/screens/Dashboard/User/Courses/Summary'

export default function TeacherProfile() {
  return (
    <DashboardLayout>
      <UserCoursesSummary />
    </DashboardLayout>
  )
}
