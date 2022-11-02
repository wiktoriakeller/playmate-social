import { Button, Divider, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateUserMutation } from "../api/identity/identityApi";

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
    <div className="register-page">
      <div className="form-container">
        <TextField
          label="Email"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Username"
          variant="filled"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          label="Confirm password"
          variant="filled"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button variant="contained" onClick={handleRegister}>
          Register
        </Button>
        <Divider variant="middle" />
        <Link href="/login" underline="hover">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
