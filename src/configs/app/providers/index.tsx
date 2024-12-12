"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClientProvider } from "@/configs/libs/react-query";
import { combineComponents } from "@/shared/utils/components";
import { ClerkProvider } from "@clerk/nextjs";

const _AppProvider = combineComponents([
  QueryClientProvider,
  ClerkProvider,
  SidebarProvider,
]);

export function AppProvider(props: { children: React.ReactNode }) {
  return <_AppProvider attribute="class">{props.children}</_AppProvider>;
}
