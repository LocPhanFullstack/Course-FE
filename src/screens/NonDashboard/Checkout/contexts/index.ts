import React from "react";
import { useAPIGetCourse } from "../apis";

interface CheckoutScreenContextProps {
  apiGetCourse: ReturnType<typeof useAPIGetCourse>;
}

export const CheckoutScreenContext = React.createContext<
  Partial<CheckoutScreenContextProps>
>({});
