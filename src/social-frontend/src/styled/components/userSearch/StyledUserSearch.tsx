import styled from "@emotion/styled";
import { TextField } from "@mui/material";

export const StyledUserSearch = styled(TextField)`
  width: 100%;
  max-width: 1200px;
  margin-top: 40px;
  padding: 0px 10%;

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    margin-top: 20px;
  }
`;
