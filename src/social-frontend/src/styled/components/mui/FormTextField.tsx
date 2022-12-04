import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const FormTextField = styled(TextField)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: inherit;
    box-shadow: inherit;
  }
`;
