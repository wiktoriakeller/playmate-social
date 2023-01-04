import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export interface IAppStoreProviderProps {
  children: ReactNode;
}

const AppStoreProvider = ({ children }: IAppStoreProviderProps) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppStoreProvider;
