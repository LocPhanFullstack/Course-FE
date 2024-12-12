import { Header } from "@/components/layout";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

export const ProfileScreen = () => {
  return (
    <>
      <Header title="Profile" subtitle="View your profile" />
      <UserProfile
        path="/teacher/profile"
        routing="path"
        appearance={{
          baseTheme: dark,
          elements: {
            scrollBox: "bg-customgreys-darkGrey",
            navbar: {
              "& > div:nth-child(1)": {
                background: "none",
              },
            },
          },
        }}
      />
    </>
  );
};
