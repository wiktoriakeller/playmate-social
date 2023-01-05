import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { useAuthenticateExternalUserMutation } from "../../api/identity/identityApi";
import { IAuthenticateUserResponse } from "../../api/identity/responses/authenticateUserResponse";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { openSnackbar, SnackbarSeverity } from "../../slices/snackbarSlice";
import { selectThemeMode } from "../../slices/themeSlice";
import { setUserIdentity } from "../../slices/userIdentitySlice";

const GoogleSignInButton = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authenticateExternalUser] = useAuthenticateExternalUserMutation();
  const themeMode = useAppSelector(selectThemeMode);
  const matchesMaxWidth = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100%",
        width: "100%",
        overflow: "hidden",
        height: "40px"
      }}
    >
      <GoogleLogin
        onSuccess={(responseToken) => {
          authenticateExternalUser({
            token: responseToken.credential,
            provider: "Google"
          })
            .unwrap()
            .then((response) => {
              dispatch(setUserIdentity(response.data));
              navigate("/");
            })
            .catch(
              (error: {
                status: string | number;
                data: IAuthenticateUserResponse;
              }) => {
                dispatch(
                  openSnackbar({
                    message:
                      error.data?.errors.length > 0
                        ? error.data.errors[0]
                        : "Invalid credentials",
                    severity: SnackbarSeverity.Error,
                    status: error.status
                  })
                );
              }
            );
        }}
        onError={() => {
          dispatch(
            openSnackbar({
              message: "Sign in with Google failed",
              severity: SnackbarSeverity.Error
            })
          );
        }}
        shape={"rectangular"}
        type={"standard"}
        ux_mode={"popup"}
        context={"signin"}
        size={"large"}
        width={matchesMaxWidth ? "360px" : "400px"}
        theme={themeMode === "dark" ? "filled_blue" : "outline"}
      />
    </Box>
  );
};

export default GoogleSignInButton;
