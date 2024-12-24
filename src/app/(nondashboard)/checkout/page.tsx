import { NonDashboardLayout } from "@/components/layout/nondashboard";
import { LoadingSpinner } from "@/components/loading";
import { CheckoutScreen } from "@/screens/NonDashboard/Checkout";
import { Suspense } from "react";

export default function Search() {
  return (
    <NonDashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <CheckoutScreen />
      </Suspense>
    </NonDashboardLayout>
  );
}
