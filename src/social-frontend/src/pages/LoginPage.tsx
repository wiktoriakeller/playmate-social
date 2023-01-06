import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { CircularProgress, IconButton, InputAdornment } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticateUserMutation } from "../api/identity/identityApi";
import { IAuthenticateUserResponse } from "../api/identity/responses/authenticateUserResponse";
import { useAppDispatch } from "../app/storeHooks";
import {
  validateAll,
  validateMinLength,
  ValidationFunc
} from "../common/validators";
import GoogleSignInButton from "../components/common/GoogleSignInButton";
import { openSnackbar, SnackbarSeverity } from "../slices/snackbarSlice";
import { setUserIdentity } from "../slices/userIdentitySlice";
import { FormTextField } from "../styled/components/common/FormTextField";
import { StyledHorizontalDivider } from "../styled/components/common/StyledDivider";
import { StyledLink } from "../styled/components/common/StyledLink";
import { StyledLoadingButton } from "../styled/components/common/StyledLoadingButton";
import { StyledSpan } from "../styled/components/common/StyledSpan";
import { FormBox } from "../styled/components/pages/common/FormBox";
import { FormContainer } from "../styled/components/pages/common/FormContainer";
import { FormTitle } from "../styled/components/pages/common/FormTitle";
import { FormTitleContainer } from "../styled/components/pages/common/FormTitleContainer";
import { MainLogo } from "../styled/components/pages/common/MainLogo";

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
  const [authenticate] = useAuthenticateUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isFirstAuth, setIsFirstAuth] = useState(true);

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
    validateForm(!isFirstAuth);
  }, [loginState, isFirstAuth, validateForm]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLoginSubmit = () => {
    if (isLoading) {
      return;
    }

    let isError = false;
    if (isFirstAuth) {
      isError = validateForm(true);
      setIsFirstAuth(false);
    }

    if (isError) {
      return;
    }

    setIsLoading(true);
    authenticate(loginState)
      .unwrap()
      .then((response) => {
        setIsLoading(false);
        dispatch(setUserIdentity(response.data));
        navigate("/");
      })
      .catch(
        (error: {
          status: string | number;
          data: IAuthenticateUserResponse;
        }) => {
          setIsLoading(false);
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
  };

  return (
    <FormContainer>
      <FormTitleContainer>
        <IconButton disableRipple={true} onClick={() => navigate("/")}>
          <MainLogo />
        </IconButton>
        <FormTitle>Sign In to Playmate</FormTitle>
      </FormTitleContainer>
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
            size="small"
            disabled={isLoading}
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
            disabled={isLoading}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle-password-visibility"
                    onClick={toggleShowPassword}
                    disableRipple={true}
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize="small" />
                    ) : (
                      <Visibility fontSize="small" />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <StyledLoadingButton
            type="submit"
            variant="contained"
            disabled={!isFormValid || isLoading}
            size="medium"
            fullWidth={true}
            isLoading={isLoading}
            color="secondary"
          >
            <CircularProgress color="secondary" />
            <span>Login</span>
          </StyledLoadingButton>
          <StyledSpan>
            {"Don't have an account? "}
            {isLoading ? (
              "Sign Up"
            ) : (
              <StyledLink href="/register" underline="hover">
                Sign Up
              </StyledLink>
            )}
          </StyledSpan>
          <StyledHorizontalDivider variant="middle" textAlign="center">
            <StyledSpan>Or</StyledSpan>
          </StyledHorizontalDivider>
          <GoogleSignInButton
            isLoading={isLoading}
            setIsLoading={(value: boolean) => setIsLoading(value)}
          />
        </FormBox>
      </Paper>
    </FormContainer>
  );
};

export default LoginPage;
