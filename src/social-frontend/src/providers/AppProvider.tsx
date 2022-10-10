import * as React from "react";
import TokenProvider from "../hooks/UserContext";

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <TokenProvider>
      {children}
    </TokenProvider>
  );
};
