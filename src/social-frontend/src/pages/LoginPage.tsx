import { Divider, Link, Paper } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticateUserMutation } from "../api/identity/identityApi";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/userSlice";
import { StyledButton } from "../styled/components/mui/StyledButton";
import { StyledTextField } from "../styled/components/mui/StyledTextField";
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
        dispatch(setUser(e.data));
        navigate("/");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <FormContainer>
      <StyledTextField
        label="Email"
        variant="outlined"
        onChange={(event) => setEmail(event.target.value)}
      />
      <StyledTextField
        label="Password"
        variant="outlined"
        type={"password"}
        onChange={(event) => setPassword(event.target.value)}
      />
      <StyledButton variant="contained" onClick={handleLogin}>
        Login
      </StyledButton>
      <Divider variant="middle" />
      <Link href="/register" underline="hover">
        Do you want to register?
      </Link>
    </FormContainer>
  );
};

export default LoginPage;
