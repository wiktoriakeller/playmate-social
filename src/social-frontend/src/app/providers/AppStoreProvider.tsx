import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store";

interface AppStoreProvider {
  children: ReactNode;
}

const AppStoreProvider = ({ children }: AppStoreProvider) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppStoreProvider;
