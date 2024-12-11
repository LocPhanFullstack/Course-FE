import React from "react";
import { useAPIGetListOfCourses } from "../apis";

interface HomeScreenContextProps {
  apiGetListOfCourses: ReturnType<typeof useAPIGetListOfCourses>;
}

export const HomeScreenContext = React.createContext<
  Partial<HomeScreenContextProps>
>({});
