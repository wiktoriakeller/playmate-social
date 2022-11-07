import styled from "@emotion/styled";
import { Button } from "@mui/material";

export const StyledButton = styled(Button)`
  &.MuiButton-root {
    min-width: 100%;
    color: ${(props) => props.theme.palette.white};
    background-color: ${(props) => props.theme.palette.secondary.main};

    &:hover {
      background-color: ${(props) => props.theme.palette.secondary.dark};
    }
  }
`;
