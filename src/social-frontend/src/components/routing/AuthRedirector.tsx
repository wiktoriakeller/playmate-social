import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserTokens } from "../../slices/userSlice";

const AuthRedirector = ({ children }) => {
  const userTokens = useAppSelector(selectUserTokens);

  if (!!userTokens) {
    return <>{children}</>;
  }

  return <Navigate to={"/signin"} />;
};

export default AuthRedirector;
