"use client";

import { useAPIGetListOfCourses } from "./apis/get-list-of-courses";
import React from "react";
import { HomeScreenContext } from "./contexts";
import { Landing } from "./components";
import { Footer, NonDashboardNavbar } from "@/components/layout";

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
