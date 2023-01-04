import styled from "@emotion/styled";
import { IconButton } from "@mui/material";

export const StyledIconButton = styled(IconButton)`
  &.MuiButtonBase-root {
    color: ${(props) => props.theme.palette.secondary.main};

    &:hover {
      color: ${(props) => props.theme.palette.secondary.light};
    }
  }
`;
