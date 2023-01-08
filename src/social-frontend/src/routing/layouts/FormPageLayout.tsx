import AuthRedirector from "../AuthRedirector";
import { ILayoutProps } from "./MainLayout";

const FormPageLayout = ({ children }: ILayoutProps) => {
  return (
    <main>
      <AuthRedirector>{children}</AuthRedirector>
    </main>
  );
};

export default FormPageLayout;
