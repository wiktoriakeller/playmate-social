import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticateUserMutation } from "../api/identity/identityApi";
import { IAuthenticateUserResponse } from "../api/identity/responses/authenticateUserResponse";
import { useAppDispatch } from "../app/hooks";
import {
  validateAll,
  validateMinLength,
  ValidationFunc
} from "../common/validators";
import { openSnackbar, SnackbarSeverity } from "../slices/snackbarSlice";
import { setUserIdentity } from "../slices/userIdentitySlice";
import { FormTextField } from "../styled/components/mui/FormTextField";
import { StyledButton } from "../styled/components/mui/StyledButton";
import { StyledDivider } from "../styled/components/mui/StyledDivider";
import { StyledLink } from "../styled/components/mui/StyledLink";
import { FormBox } from "../styled/pages/FormBox";
import { FormContainer } from "../styled/pages/FormContainer";

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

  const validators: ValidationFunc[] = [
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
  ];

  const validateForm = useCallback(
    (validate: boolean) => {
      if (validate) {
        const isError = validateAll(validate, validators);
        setIsFormValid(!isError);
        return isError;
      }

      return false;
    },
    [loginState]
  );

  useEffect(() => {
    validateForm(!isFirstRender);
  }, [loginState]);

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
  }, [loginState]);

  return (
    <FormContainer>
      <Paper elevation={3}>
        <FormBox>
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
            variant="contained"
            onClick={handleLoginSubmit}
            disabled={!isFormValid}
          >
            Login
          </StyledButton>
          <StyledDivider variant="middle" />
          <StyledLink href="/register" underline="hover">
            Do you want to register?
          </StyledLink>
        </FormBox>
      </Paper>
    </FormContainer>
  );
};

export default LoginPage;
