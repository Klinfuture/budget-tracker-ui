import React from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children?: React.ReactNode;
}
export default async function SidebarContextProvider({
  children,
}: AppLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>{children}</SidebarProvider>
  );
}
