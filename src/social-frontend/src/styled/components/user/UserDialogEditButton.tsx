import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const UserDialogEditButton = styled(Button)`
  &.MuiButtonBase-root {
    position: absolute;
    margin-top: 120px;
    margin-left: 150px;

    .Mui-disabled {
      background-color: ${(props) => props.theme.palette.primary.main};
      color: ${(props) => props.theme.palette.common.white};
    }

    @media only screen and (max-width: 450px) {
      margin-top: 100px;
      margin-left: 130px;
    }
  }
`;
