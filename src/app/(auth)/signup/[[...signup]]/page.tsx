import { AuthLayout } from "@/components/layout/auth";
import { SignUpScreen } from "@/screens/Auth/SignUp";

export default function SignUp() {
  return (
    <AuthLayout>
      <SignUpScreen />
    </AuthLayout>
  );
}
