"use client";

import React from "react";
import { HomeScreenContext } from "./contexts";
import { Landing } from "./components";
import { NonDashboardNavbar } from "@/components/layout/nondashboard";
import { Footer } from "@/components/layout/app";
import { useAPIGetListOfCourses } from "@/shared/apis";

export const HomeScreen = () => {
  const apiGetListOfCourses = useAPIGetListOfCourses();

  React.useEffect(() => {
    apiGetListOfCourses.mutate({});
  }, []);

  return (
    <HomeScreenContext.Provider value={{ apiGetListOfCourses }}>
      <div className="nondashboard-layout">
        <NonDashboardNavbar />
        <main className="nondashboard-layout__main">
          <Landing />
        </main>
        <Footer />
      </div>
    </HomeScreenContext.Provider>
  );
};
