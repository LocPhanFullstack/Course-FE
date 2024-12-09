import React from "react";
import { useAPIGetListOfCourses } from "../apis/get-list-of-courses";

interface HomeScreenContextProps {
  apiGetListOfCourses: ReturnType<typeof useAPIGetListOfCourses>;
}

export const HomeScreenContext = React.createContext<
  Partial<HomeScreenContextProps>
>({});
