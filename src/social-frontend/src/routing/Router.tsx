import { useMediaQuery } from "@mui/material";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "../app/storeHooks";
import MobileChatMessages from "../components/chat/MobileChatMessages";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import { PageNotFound } from "../pages/PageNotFound";
import RegisterPage from "../pages/RegisterPage";
import {
  setMatchesExtraSmallWidth,
  setMatchesMediumWidth,
  setMatchesSmallWidth
} from "../slices/windowSizeSlice";
import FormPageLayout from "./layouts/FormPageLayout";
import MainLayout from "./layouts/MainLayout";

function Router() {
  const dispatch = useAppDispatch();
  const matchesMediumWidth = useMediaQuery("only screen and (max-width:600px)");
  const matchesSmallWidth = useMediaQuery("only screen and (max-width:450px)");
  const matchesExtraSmallWidth = useMediaQuery(
    "only screen and (max-width:380px)"
  );

  useEffect(() => {
    dispatch(setMatchesMediumWidth(matchesMediumWidth));
  }, [matchesMediumWidth, dispatch]);

  useEffect(() => {
    dispatch(setMatchesSmallWidth(matchesSmallWidth));
  }, [matchesSmallWidth, dispatch]);

  useEffect(() => {
    dispatch(setMatchesExtraSmallWidth(matchesExtraSmallWidth));
  }, [matchesExtraSmallWidth, dispatch]);

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
        <Route
          path="/chats"
          element={
            <MainLayout>
              <MobileChatMessages />
            </MainLayout>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
