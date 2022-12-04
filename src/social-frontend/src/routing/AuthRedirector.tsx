import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { getUserFromStorage } from "../common/storage";
import {
  getEmptyUserIdentity,
  setUserIdentity
} from "../slices/userIdentitySlice";

export interface IAuthRedirectorProps {
  children: ReactNode;
}

const AuthRedirector = (props: IAuthRedirectorProps) => {
  const dispatch = useAppDispatch();
  const user = getUserFromStorage();
  const location = useLocation();

  let hasToken = !!user?.jwtToken;
  const redirectToHome =
    location.pathname === "/login" || location.pathname === "/register";

  if (!!user?.jwtToken) {
    dispatch(setUserIdentity(user));
  } else if (user === null) {
    dispatch(setUserIdentity(getEmptyUserIdentity()));
  }

  if (redirectToHome) {
    if (hasToken) {
      return <Navigate to={"/"} />;
    }

    return <>{props.children}</>;
  }

  if (hasToken) {
    return <>{props.children}</>;
  }

  return <Navigate to={"/login"} />;
};

export default AuthRedirector;
