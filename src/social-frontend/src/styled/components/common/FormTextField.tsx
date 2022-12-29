import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const FormTextField = styled(TextField)`
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0px #000;
    box-shadow: 0px #000;
  }

  input::-ms-reveal,
  input::-ms-clear {
    display: none;
  }

  .MuiFormHelperText-root {
    margin: 6px 0px -5px 5px;
  }
`;
