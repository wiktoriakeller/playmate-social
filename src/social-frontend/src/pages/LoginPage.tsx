import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticateUserMutation } from "../api/identity/identityApi";
import { useAppDispatch } from "../app/hooks";
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

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authenticate] = useAuthenticateUserMutation();
  const [showPassword, setShowPassword] = useState(false);

  const [loginState, setLogin] = useState<ILoginFormState>({
    email: "",
    password: ""
  });

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleLogin = useCallback(() => {
    authenticate(loginState)
      .unwrap()
      .then((e) => {
        dispatch(setUserIdentity(e.data));
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  }, [loginState]);

  return (
    <FormContainer>
      <Paper elevation={3}>
        <FormBox>
          <FormTextField
            label="Email"
            type={"email"}
            variant="outlined"
            onChange={(event) =>
              setLogin({ ...loginState, email: event.target.value })
            }
            fullWidth
          />
          <FormTextField
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
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <StyledButton variant="contained" onClick={handleLogin}>
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
