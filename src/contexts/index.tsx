import TenstackQueryProvider from "./query";

interface ContextsProviderProps {
  children: React.ReactNode;
}

export default function ContextsProvider({ children }: ContextsProviderProps) {
  return (
    <TenstackQueryProvider>
      {children}
    </TenstackQueryProvider>
  );
}
