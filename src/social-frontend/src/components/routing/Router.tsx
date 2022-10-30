import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRedirector from "./AuthRedirector";
import { Header } from "../Header";

function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <AuthRedirector>
              <div>Home page</div>
            </AuthRedirector>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
