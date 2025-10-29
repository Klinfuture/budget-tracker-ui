import TenstackQueryProvider from "./query";
import SidebarContextProvider from "./sidebar";

interface ContextsProviderProps {
  children: React.ReactNode;
}

export default function ContextsProvider({ children }: ContextsProviderProps) {
  return (
    <TenstackQueryProvider>
      
        <SidebarContextProvider>{children}</SidebarContextProvider>
    </TenstackQueryProvider>
  );
}
