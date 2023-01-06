import { ReactNode } from "react";
import AuthRedirector from "../AuthRedirector";
import { Header } from "../../components/header/Header";

export interface ILayoutProps {
  children?: ReactNode;
}

const MainLayout = ({ children }: ILayoutProps) => {
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
