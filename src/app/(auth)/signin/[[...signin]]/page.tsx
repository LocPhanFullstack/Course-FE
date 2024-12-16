import { AuthLayout } from "@/components/layout/auth";
import { SignInScreen } from "@/screens/Auth/SignIn";

export default function SignIn() {
  return (
    <AuthLayout>
      <SignInScreen />
    </AuthLayout>
  );
}
