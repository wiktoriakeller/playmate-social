import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../api/identity/identityApi";
import { ICreateUserResponse } from "../api/identity/responses/createUserResponse";
import { useAppDispatch } from "../app/storeHooks";
import {
  validateAll,
  validateEquality,
  validateRange,
  ValidationFunc
} from "../common/validators";
import { openSnackbar, SnackbarSeverity } from "../slices/snackbarSlice";
import { FormBox } from "../styled/components/common/FormBox";
import { FormContainer } from "../styled/components/common/FormContainer";
import { FormTextField } from "../styled/components/common/FormTextField";
import { StyledButton } from "../styled/components/common/StyledButton";
import { StyledLink } from "../styled/components/common/StyledLink";
import { StyledSpan } from "../styled/components/common/StyledSpan";

interface IRegisterFormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface IRegisterFromValidationState {
  emailError: string;
  usernameError: string;
  passwordError: string;
  confirmPasswordError: string;
}

const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  const [registerState, setRegisterState] = useState<IRegisterFormState>({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [registerValidationState, setRegisterValidationState] =
    useState<IRegisterFromValidationState>({
      emailError: "",
      usernameError: "",
      passwordError: "",
      confirmPasswordError: ""
    });

  const validators: ValidationFunc[] = useMemo(
    () => [
      () =>
        validateRange(
          registerState.email,
          1,
          20,
          "Email is required and can have at most 20 characters",
          (value) =>
            setRegisterValidationState((prev) => ({
              ...prev,
              emailError: value
            }))
        ),
      () =>
        validateRange(
          registerState.username,
          2,
          20,
          "Username must be 2-20 characters long",
          (value) =>
            setRegisterValidationState((prev) => ({
              ...prev,
              usernameError: value
            }))
        ),
      () =>
        validateEquality(
          registerState.confirmPassword,
          registerState.password,
          "Password and confirm password must be equal",
          (value) => {
            setRegisterValidationState((prev) => ({
              ...prev,
              confirmPasswordError: value
            }));
          }
        ),
      () =>
        validateRange(
          registerState.password,
          6,
          20,
          "Password must be 6-20 characters long",
          (value) =>
            setRegisterValidationState((prev) => ({
              ...prev,
              passwordError: value
            }))
        )
    ],
    [registerState]
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
  }, [registerState, isFirstRender, validateForm]);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleRegister = useCallback(() => {
    if (isFirstRender) {
      const isError = validateForm(true);
      setIsFirstRender(false);

      if (isError) {
        return;
      }
    }

    createUser(registerState)
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch(
        (error: { status: string | number; data: ICreateUserResponse }) => {
          dispatch(
            openSnackbar({
              message:
                error.data?.errors.length > 0
                  ? error.data.errors[0]
                  : "Could not create user",
              severity: SnackbarSeverity.Error,
              status: error.status
            })
          );
        }
      );
  }, [
    registerState,
    createUser,
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
            handleRegister();
          }}
        >
          <FormTextField
            error={registerValidationState.emailError.length > 0}
            helperText={registerValidationState.emailError}
            label="Email"
            type={"email"}
            variant="outlined"
            onChange={(event) =>
              setRegisterState({
                ...registerState,
                email: event.target.value
              })
            }
            fullWidth
          />
          <FormTextField
            error={registerValidationState.usernameError.length > 0}
            helperText={registerValidationState.usernameError}
            label="Username"
            variant="outlined"
            onChange={(event) =>
              setRegisterState({
                ...registerState,
                username: event.target.value
              })
            }
            fullWidth
          />
          <FormTextField
            error={registerValidationState.passwordError.length > 0}
            helperText={registerValidationState.passwordError}
            label="Password"
            variant="outlined"
            type={showPassword ? "text" : "password"}
            onChange={(event) =>
              setRegisterState({
                ...registerState,
                password: event.target.value
              })
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
          <FormTextField
            error={registerValidationState.confirmPasswordError.length > 0}
            helperText={registerValidationState.confirmPasswordError}
            label="Confirm password"
            variant="outlined"
            type={showConfirmPassword ? "text" : "password"}
            onChange={(event) =>
              setRegisterState({
                ...registerState,
                confirmPassword: event.target.value
              })
            }
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={toggleShowConfirmPassword}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Register
          </StyledButton>
          <StyledSpan>
            {"Already have an account? "}
            <StyledLink href="/login" underline="hover">
              Sign In
            </StyledLink>
          </StyledSpan>
        </FormBox>
      </Paper>
    </FormContainer>
  );
};

export default RegisterPage;
