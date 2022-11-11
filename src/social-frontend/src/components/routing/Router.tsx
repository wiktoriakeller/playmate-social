import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import { Header } from "../header/Header";
import AuthRedirector from "./AuthRedirector";

function Router() {
  return (
    <BrowserRouter>
      <div className="main-layout">
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
      </div>
    </BrowserRouter>
  );
}

export default Router;