import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRedirector from "./form/AuthRedirector";
import Header from "./Header";
import SignupForm from "./form/SignupForm";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="signup" element={<SignupForm />} />
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
