import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";
import { Header } from "../Header";
import AuthRedirector from "./AuthRedirector";

function Router() {
  return (
    <BrowserRouter>
      <div className="main-layout">
        <Header />
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
          <Route
            path="/"
            element={
              <AuthRedirector>
                <div>Home page</div>
              </AuthRedirector>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default Router;
