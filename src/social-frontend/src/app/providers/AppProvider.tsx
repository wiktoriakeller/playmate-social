import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: AppProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;
