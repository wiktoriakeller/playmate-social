import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../api/identity/identityApi";
import { FormTextField } from "../styled/components/mui/FormTextField";
import { StyledButton } from "../styled/components/mui/StyledButton";
import { StyledDivider } from "../styled/components/mui/StyledDivider";
import { StyledLink } from "../styled/components/mui/StyledLink";
import { FormBox } from "../styled/pages/FormBox";
import { FormContainer } from "../styled/pages/FormContainer";

interface IRegisterFormState {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerState, setRegisterState] = useState<IRegisterFormState>({
    email: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const toggleShowConfirmPassword = useCallback(() => {
    setShowConfirmPassword((prev) => !prev);
  }, []);

  const handleRegister = useCallback(() => {
    createUser(registerState)
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [registerState]);

  return (
    <FormContainer>
      <Paper elevation={3}>
        <FormBox>
          <FormTextField
            label="Email"
            type={"email"}
            variant="outlined"
            onChange={(event) =>
              setRegisterState({ ...registerState, email: event.target.value })
            }
            fullWidth
          />
          <FormTextField
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
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <FormTextField
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
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <StyledButton variant="contained" onClick={handleRegister}>
            Register
          </StyledButton>
          <StyledDivider variant="middle" />
          <StyledLink href="/login" underline="hover">
            Already have an account?
          </StyledLink>
        </FormBox>
      </Paper>
    </FormContainer>
  );
};

export default RegisterPage;
