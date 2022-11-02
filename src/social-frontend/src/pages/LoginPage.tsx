import { Button, Divider, Link } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthenticateUserMutation } from "../api/identity/identityApi";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../slices/userSlice";

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
    <div className="login-page">
      <div className="form-container">
        <TextField
          label="Email"
          variant="filled"
          onChange={(event) => setEmail(event.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type={"password"}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
        <Divider variant="middle" />
        <Link href="/register" underline="hover">
          Do you want to register?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
