import styled from "@emotion/styled";
import { Link } from "@mui/material";

export const StyledLink = styled(Link)`
  &.MuiLink-root {
    color: ${(props) => props.theme.palette.link};
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.palette.linkHover};
    }
  }
`;
