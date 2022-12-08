import { ReactNode } from "react";
import AuthRedirector from "../AuthRedirector";
import { Header } from "../../components/header/Header";

export interface IMainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <div>
      <Header />
      <main>
        <AuthRedirector>{children}</AuthRedirector>
      </main>
    </div>
  );
};

export default MainLayout;
