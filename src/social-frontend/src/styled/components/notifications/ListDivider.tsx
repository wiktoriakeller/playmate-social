import styled from "@emotion/styled";
import { Divider } from "@mui/material";

export const ListDivider = styled(Divider)`
  &.MuiDivider-root {
    background-color: ${(props) => props.theme.palette.grey[600]};
  }
`;
