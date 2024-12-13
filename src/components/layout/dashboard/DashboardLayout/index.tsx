"use client";

import { LoadingSpinner } from "@/components/loading";
import { cn } from "@/shared/utils/components";
import { useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import React from "react";
import { AppSidebar, Navbar } from "../../app";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const { courseId, setCourseId } = React.useState<string | null>(null);
  const { user, isLoaded } = useUser();

  // Handle useEffect isCoursePage

  if (!isLoaded) return <LoadingSpinner />;
  if (!user) return <div>Please sign in to access this page</div>;

  return (
    <div className="dashboard">
      <AppSidebar />
      {/* Sidebar */}
      <div className="dashboard__content">
        {/* Chapter sidebar will go */}
        <div className={cn("dashboard__main")} style={{ height: "100vh" }}>
          <Navbar />
          <main className="dashboard__body">{children}</main>
        </div>
      </div>
    </div>
  );
};
