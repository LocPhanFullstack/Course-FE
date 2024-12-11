"use client";

import NonDashboardNavbar from "@/components/NonDashboardNavbar";
import Footer from "@/components/Footer";
import { useAPIGetListOfCourses } from "./apis/get-list-of-courses";
import React from "react";
import { HomeScreenContext } from "./contexts";
import { Landing } from "./components";

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
