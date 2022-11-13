import { Divider, TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticateUserMutation } from "../api/identity/identityApi";
import { useAppDispatch } from "../app/hooks";
import { setUserIdentity } from "../slices/userIdentitySlice";
import { StyledButton } from "../styled/components/mui/StyledButton";
import { StyledDivider } from "../styled/components/mui/StyledDivider";
import { StyledLink } from "../styled/components/mui/StyledLink";
import { FormBox } from "../styled/pages/FormBox";
import { FormContainer } from "../styled/pages/FormContainer";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [authenticate] = useAuthenticateUserMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    authenticate({
      email: email,
      password: password
    })
      .unwrap()
      .then((e) => {
        dispatch(setUserIdentity(e.data));
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <FormContainer>
      <Paper elevation={3}>
        <FormBox>
          <TextField
            label="Email"
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type={"password"}
            onChange={(event) => setPassword(event.target.value)}
            fullWidth
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
