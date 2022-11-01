import { Button, Divider, Link } from "@mui/material";
import TextField from "@mui/material/TextField";

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="form-container">
        <TextField label="Email" variant="filled" />
        <TextField label="Username" variant="filled" />
        <TextField label="Password" variant="filled" />
        <TextField label="Confirm" variant="filled" />
        <Button variant="contained">Register</Button>
        <Divider variant="middle" />
        <Link href="/login" underline="hover">
          Already have an account?
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
