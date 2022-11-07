import styled from "@emotion/styled";
import { Link } from "@mui/material";

export const StyledLink = styled(Link)`
  &.MuiButton-root {
    color: ${(props) => props.theme.palette.text.secondary};
  }
`;
