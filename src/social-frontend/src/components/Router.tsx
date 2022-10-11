import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRedirector from "./form/AuthRedirector";
import Header from "./Header";
import SignupPage from "../pages/SignupPage";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="signup" element={<SignupPage />} />
        <Route
          path="secret"
          element={
            <AuthRedirector>
              <div>secret text</div>
            </AuthRedirector>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
