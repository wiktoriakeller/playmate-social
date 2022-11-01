import { Button, Divider, Link } from "@mui/material";
import TextField from "@mui/material/TextField";

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="form-container">
        <TextField label="Email" variant="filled" />
        <TextField label="Password" variant="filled" />
        <Button variant="contained">Login</Button>
        <Divider variant="middle" />
        <Link href="/register" underline="hover">
          Do you want to register?
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
