import { ReactNode } from "react";
import AuthRedirector from "../AuthRedirector";
import { Header } from "../../components/header/Header";

export interface IMainLayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: IMainLayoutProps) => {
  return (
    <>
      <Header />
      <main>
        <AuthRedirector>{children}</AuthRedirector>
      </main>
    </>
  );
};

export default MainLayout;
