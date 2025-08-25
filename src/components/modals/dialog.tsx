"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import React from "react";

export function CustomModal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const handleOpenChange = () => {
    router.back();
  };

  return (
    <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
      <DialogClose className={"w-10 h-10"} />
      <DialogContent
        className={
          "w-screen max-h-full md:max-w-lg md:max-h-[80vh] overflow-hidden"
        }
      >
        <div className={`w-full max-h-[80vh] overflow-y-auto pt-4`}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
