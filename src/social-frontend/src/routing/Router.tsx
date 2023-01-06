import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { PageNotFound } from "../pages/PageNotFound";
import RegisterPage from "../pages/RegisterPage";
import FormPageLayout from "./layouts/FormPageLayout";
import MainLayout from "./layouts/MainLayout";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
        <Route
          path="/login"
          element={
            <FormPageLayout>
              <LoginPage />
            </FormPageLayout>
          }
        />
        <Route
          path="/register"
          element={
            <FormPageLayout>
              <RegisterPage />
            </FormPageLayout>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
