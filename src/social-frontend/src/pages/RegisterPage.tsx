import { TextField } from "@mui/material";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../api/identity/identityApi";
import { StyledButton } from "../styled/components/mui/StyledButton";
import { StyledDivider } from "../styled/components/mui/StyledDivider";
import { StyledLink } from "../styled/components/mui/StyledLink";
import { FormBox } from "../styled/pages/FormBox";
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
      <Paper elevation={3}>
        <FormBox>
          <TextField
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Username"
            variant="outlined"
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="Confirm password"
            variant="outlined"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
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
