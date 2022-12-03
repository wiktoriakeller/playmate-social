import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getUserFromStorage } from "../common/storage";
import {
  selectUserIdentity,
  setUserIdentity
} from "../slices/userIdentitySlice";

export interface IAuthRedirectorProps {
  children: ReactNode;
}

const AuthRedirector = (props: IAuthRedirectorProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserIdentity);
  const location = useLocation();

  let hasToken = !!user.jwtToken;
  const redirectToHome =
    location.pathname === "/login" || location.pathname === "/register";

  if (user.jwtToken === null) {
    const userFromStorage = getUserFromStorage();
    if (userFromStorage.jwtToken !== null) {
      hasToken = true;
      dispatch(setUserIdentity(userFromStorage));
    }
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
