import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { selectUserTokens } from "../../slices/userSlice";

const AuthRedirector = ({ children }) => {
  const userTokens = useAppSelector(selectUserTokens);

  if (!!userTokens.jwtToken) {
    return <>{children}</>;
  }

  return <Navigate to={"/login"} />;
};

export default AuthRedirector;
