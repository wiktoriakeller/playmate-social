import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserTokens } from "../../slices/userIdentitySlice";

export interface AuthRedirectorProps {
  redirectToHome?: boolean;
  children: ReactNode;
}

const AuthRedirector = (props: AuthRedirectorProps) => {
  const userTokens = useAppSelector(selectUserTokens);
  const hasToken = !!userTokens.jwtToken;

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
