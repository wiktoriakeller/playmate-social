import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: ${(props) => props.theme.palette.background.paper};
  }
`;
