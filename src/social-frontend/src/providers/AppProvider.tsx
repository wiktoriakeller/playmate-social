import { QueryClientProvider } from "@tanstack/react-query";
import * as React from "react";
import TokenProvider from "../hooks/UserContext";
import { queryClient } from "../lib/react-query";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <TokenProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </TokenProvider>
  );
};
