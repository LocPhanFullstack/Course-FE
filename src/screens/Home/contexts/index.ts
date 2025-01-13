import { useAPIGetListOfCourses } from "@/shared/apis";
import React from "react";

interface HomeScreenContextProps {
  apiGetListOfCourses: ReturnType<typeof useAPIGetListOfCourses>;
}

export const HomeScreenContext = React.createContext<
  Partial<HomeScreenContextProps>
>({});
