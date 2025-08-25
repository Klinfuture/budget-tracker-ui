import { CustomModal } from "@/components/modals/dialog";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <CustomModal>{children}</CustomModal>;
}
