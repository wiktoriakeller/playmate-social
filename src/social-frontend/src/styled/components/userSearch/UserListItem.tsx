import styled from "@emotion/styled";
import { ListItem } from "@mui/material";

export const UserListItem = styled(ListItem)`
  min-width: 250px;
  border: 1px solid
    ${(props) =>
      props.theme.palette.mode === "dark"
        ? props.theme.palette.background.paper
        : props.theme.palette.primary.light};

  box-shadow: ${(props) => props.theme.shadows[1]};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};

  &:hover {
    background-color: ${(props) =>
      props.theme.palette.mode === "dark"
        ? props.theme.palette.background.paper
        : props.theme.palette.primary.light};
  }
`;
