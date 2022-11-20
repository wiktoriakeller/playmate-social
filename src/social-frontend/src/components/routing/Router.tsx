import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import AuthRedirector from "../authentication/AuthRedirector";
import { Header } from "../header/Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <AuthRedirector redirectToHome={true}>
              <LoginPage />
            </AuthRedirector>
          }
        ></Route>
        <Route
          path="/register"
          element={
            <AuthRedirector redirectToHome={true}>
              <RegisterPage />
            </AuthRedirector>
          }
        ></Route>
        <Route
          path="/"
          element={
            <AuthRedirector>
              <HomePage />
            </AuthRedirector>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
