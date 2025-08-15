import React from "react";
import { AppSidebar } from "../navigation/sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import { cookies } from "next/headers";

interface AppLayoutProps {
  children?: React.ReactNode;
}
export default async function AppLayout({ children }: AppLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <main className="w-full flex-grow-1 flex flex-col h-full gap-4">
        <div className="w-full flex flex-row gap-4 border-b border-gray-200 p-4 items-center">
          <SidebarTrigger />
          <h1 className="text-xl font-bold mb-0">Feature Title</h1>
        </div>
        {/* <div className="w-full p-4 bg-gray-100 rounded-lg">
          <h1 className="text-xl font-bold mb-0">Feature Title</h1>
          <p className="text-gray-600">Feature description goes here.</p>
        </div> */}
        <div className="p-4 flex flex-col bg-gray-100 rounded-lg overflow-y-auto">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
