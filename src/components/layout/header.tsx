"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "../ui/sidebar";

const parsePathename = (pathname: string): string => {
  if (pathname === "/") {
    return "Dashboard";
  }
  const parts = pathname.split("/");
  return parts[parts.length - 1]
    .replace(/-/g, " ")
    .replace(/^\w/, (c) => c.toUpperCase());
};

export function AppHeader() {
  const pathename = usePathname();
  const title = parsePathename(pathename);

  return (
    <div className="w-full flex flex-row gap-4 border-b border-gray-200 p-4 items-center sticky top-0 bg-white z-10">
      <SidebarTrigger />
      <h1 className="text-xl font-bold mb-0">{title}</h1>
    </div>
  );
}
