"use client";

import { LoadingSpinner } from "@/components/loading";
import { cn } from "@/shared/utils/components";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { AppSidebar } from "../../app";
import { useRouter } from "next/navigation";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.push("/signin"); 
    }
  }, []);

  // Handle useEffect isCoursePage

  if (!isLoaded || !user) return <LoadingSpinner />;

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
