"use client";

import { useUser } from "@clerk/nextjs";
import React from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { LoadingSpinner } from "@/components/loading";
import { SlidebarContent, SlidebarFooter, SlidebarHeader } from "./components";

export const AppSidebar = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) return <LoadingSpinner />;
  if (!user) return <div>User not found</div>;

  return (
    <Sidebar
      collapsible="icon"
      style={{ height: "100vh" }}
      className="bg-customgreys-primarybg border-none shadow-lg"
    >
      <SlidebarHeader />
      <SlidebarContent />
      <SlidebarFooter />
    </Sidebar>
  );
};
