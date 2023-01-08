import styled from "@emotion/styled";
import { Avatar } from "@mui/material";

export const UserDialogContentAvatar = styled(Avatar)`
  &.MuiAvatar-root {
    width: 180px;
    height: 180px;

    @media only screen and (max-width: 450px) {
      width: 150px;
      height: 150px;
    }
  }
`;
