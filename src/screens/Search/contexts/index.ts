import { useAPIGetListOfCourses } from "@/screens/Home/apis";
import React from "react";

interface SearchScreenContextProps {
  apiGetListOfCourses: ReturnType<typeof useAPIGetListOfCourses>;
}

export const SearchScreenContext = React.createContext<
  Partial<SearchScreenContextProps>
>({});
