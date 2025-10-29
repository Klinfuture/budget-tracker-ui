import React from "react";
import { AppSidebar } from "../navigation/sidebar";
import { AppHeader } from "./header";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      <AppSidebar />
      <main className="w-full flex-grow-1 flex flex-col h-full">
        <AppHeader />
        <div className="p-4 flex flex-col overflow-y-auto">{children}</div>
      </main>
    </>
  );
}
