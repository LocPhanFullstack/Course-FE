import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { PanelLeft } from "lucide-react";
import Image from "next/image";
import React from "react";

export const SlidebarHeader = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <SidebarHeader>
      <SidebarMenu className="app-sidebar__menu">
        <SidebarMenuItem>
          <SidebarMenuButton
            size="lg"
            onClick={() => toggleSidebar()}
            className="group hover:bg-customgreys-secondarybg"
          >
            <div className="app-sidebar__logo-container group">
              <div className="app-sidebar__logo-wrapper">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={25}
                  height={20}
                  className="app-sidebar__logo"
                />
                <p className="app-sidebar__title">VOIN</p>
              </div>
              <PanelLeft className="app-sidebar__collapse-icon" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
};
