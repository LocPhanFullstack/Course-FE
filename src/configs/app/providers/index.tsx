"use client";

import { QueryClientProvider } from "@/configs/libs/react-query";
import { combineComponents } from "@/shared/utils/components";

const _AppProvider = combineComponents([QueryClientProvider]);

export function AppProvider(props: { children: React.ReactNode }) {
  return (
    <_AppProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
    >
      {props.children}
    </_AppProvider>
  );
}
