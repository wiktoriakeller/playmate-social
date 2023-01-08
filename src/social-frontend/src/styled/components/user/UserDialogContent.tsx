import styled from "@emotion/styled";
import { DialogContent } from "@mui/material";

export const UserDialogContent = styled(DialogContent)`
  &.MuiDialogContent-root {
    padding-bottom: 20px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 30px;
    padding-left: 80px;
    padding-right: 80px;

    @media only screen and (max-width: 450px) {
      padding-left: 20px;
      padding-right: 20px;
      gap: 20px;
    }
  }
`;
