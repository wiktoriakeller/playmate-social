import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, IconButton, InputAdornment } from "@mui/material";
import Paper from "@mui/material/Paper";
import { GoogleLogin } from "@react-oauth/google";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useAuthenticateExternalUserMutation,
  useAuthenticateUserMutation
} from "../api/identity/identityApi";
import { IAuthenticateUserResponse } from "../api/identity/responses/authenticateUserResponse";
import { useAppDispatch, useAppSelector } from "../app/storeHooks";
import {
  validateAll,
  validateMinLength,
  ValidationFunc
} from "../common/validators";
import { openSnackbar, SnackbarSeverity } from "../slices/snackbarSlice";
import { selectThemeMode } from "../slices/themeSlice";
import { setUserIdentity } from "../slices/userIdentitySlice";
import { FormBox } from "../styled/components/common/FormBox";
import { FormContainer } from "../styled/components/common/FormContainer";
import { FormTextField } from "../styled/components/common/FormTextField";
import { StyledButton } from "../styled/components/common/StyledButton";
import { StyledHorizontalDivider } from "../styled/components/common/StyledDivider";
import { StyledLink } from "../styled/components/common/StyledLink";
import { StyledSpan } from "../styled/components/common/StyledSpan";

interface ILoginFormState {
  email: string;
  password: string;
}

interface ILoginFormValidationState {
  emailError: string;
  passwordError: string;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector(selectThemeMode);
  const [authenticate] = useAuthenticateUserMutation();
  const [authenticateExternalUser] = useAuthenticateExternalUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [loginState, setLogin] = useState<ILoginFormState>({
    email: "",
    password: ""
  });

  const [loginValidationState, setLoginValidationState] =
    useState<ILoginFormValidationState>({
      emailError: "",
      passwordError: ""
    });

  const validators: ValidationFunc[] = useMemo(
    () => [
      () =>
        validateMinLength(loginState.email, 1, "Email is required", (value) =>
          setLoginValidationState((prev) => ({
            ...prev,
            emailError: value
          }))
        ),
      () =>
        validateMinLength(
          loginState.password,
          1,
          "Password is required",
          (value) =>
            setLoginValidationState((prev) => ({
              ...prev,
              passwordError: value
            }))
        )
    ],
    [loginState]
  );

  const validateForm = useCallback(
    (validate: boolean) => {
      if (validate) {
        const isError = validateAll(validate, validators);
        setIsFormValid(!isError);
        return isError;
      }

      return false;
    },
    [validators]
  );

  useEffect(() => {
    validateForm(!isFirstRender);
  }, [loginState, isFirstRender, validateForm]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLoginSubmit = useCallback(() => {
    if (isFirstRender) {
      const isError = validateForm(true);
      setIsFirstRender(false);

      if (isError) {
        return;
      }
    }

    authenticate(loginState)
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
  }, [
    loginState,
    authenticate,
    dispatch,
    isFirstRender,
    navigate,
    validateForm
  ]);

  return (
    <FormContainer>
      <Paper elevation={3}>
        <FormBox
          onSubmit={(e) => {
            e.preventDefault();
            handleLoginSubmit();
          }}
        >
          <FormTextField
            error={loginValidationState.emailError.length > 0}
            helperText={loginValidationState.emailError}
            label="Email"
            type={"email"}
            variant="outlined"
            onChange={(event) =>
              setLogin({ ...loginState, email: event.target.value })
            }
            fullWidth
          />
          <FormTextField
            error={loginValidationState.passwordError.length > 0}
            helperText={loginValidationState.passwordError}
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            onChange={(event) =>
              setLogin({ ...loginState, password: event.target.value })
            }
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <StyledButton
            type="submit"
            variant="contained"
            disabled={!isFormValid}
          >
            Login
          </StyledButton>
          <StyledSpan>
            {"Don't have an account? "}
            <StyledLink href="/register" underline="hover">
              Sign Up
            </StyledLink>
          </StyledSpan>
          <StyledHorizontalDivider variant="middle" textAlign="center">
            <StyledSpan>Or</StyledSpan>
          </StyledHorizontalDivider>
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
              width={"400px"}
              theme={themeMode === "dark" ? "filled_blue" : "outline"}
            />
          </Box>
        </FormBox>
      </Paper>
    </FormContainer>
  );
};

export default LoginPage;
