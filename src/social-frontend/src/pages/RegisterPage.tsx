import { Divider, Link } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../api/identity/identityApi";
import { StyledButton } from "../styled/components/mui/StyledButton";
import { StyledTextField } from "../styled/components/mui/StyledTextField";
import { FormContainer } from "../styled/pages/FormContainer";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    createUser({
      email: email,
      username: username,
      password: password
    })
      .unwrap()
      .then(() => {
        navigate("/login");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <FormContainer>
      <StyledTextField
        label="Email"
        variant="filled"
        onChange={(e) => setEmail(e.target.value)}
      />
      <StyledTextField
        label="Username"
        variant="filled"
        onChange={(e) => setUsername(e.target.value)}
      />
      <StyledTextField
        label="Password"
        variant="filled"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <StyledTextField
        label="Confirm password"
        variant="filled"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <StyledButton variant="contained" onClick={handleRegister}>
        Register
      </StyledButton>
      <Divider variant="middle" />
      <Link href="/login" underline="hover">
        Already have an account?
      </Link>
    </FormContainer>
  );
};

export default RegisterPage;
