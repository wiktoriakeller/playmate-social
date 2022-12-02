import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getUserFromStorage } from "../../common/storage";
import {
  selectUserIdentity,
  setUserIdentity
} from "../../slices/userIdentitySlice";

export interface AuthRedirectorProps {
  redirectToHome?: boolean;
  children: ReactNode;
}

const AuthRedirector = (props: AuthRedirectorProps) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserIdentity);
  let hasToken = true;

  if (user === null || user.jwtToken === null) {
    const userFromStorage = getUserFromStorage();

    if (userFromStorage === null || userFromStorage.jwtToken === null) {
      hasToken = false;
    } else {
      dispatch(setUserIdentity(userFromStorage));
    }
  }

  if (!!props.redirectToHome) {
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
