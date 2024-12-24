import { NonDashboardLayout } from "@/components/layout/nondashboard";
import { LoadingSpinner } from "@/components/loading";
import { SearchScreen } from "@/screens/NonDashboard/Search";
import { Suspense } from "react";

export default function Search() {
  return (
    <NonDashboardLayout>
      <Suspense fallback={<LoadingSpinner />}>
        <SearchScreen />
      </Suspense>
    </NonDashboardLayout>
  );
}
