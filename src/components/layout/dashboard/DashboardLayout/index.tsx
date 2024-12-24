"use client";

import { LoadingSpinner } from "@/components/loading";
import { cn } from "@/shared/utils/components";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { AppSidebar } from "../../app";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
          {/* <Navbar /> */}
          <main className="dashboard__body">{children}</main>
        </div>
      </div>
    </div>
  );
};
