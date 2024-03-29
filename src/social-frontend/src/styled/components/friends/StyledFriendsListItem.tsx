import styled from "@emotion/styled";
import { Theme } from "@mui/material";

export interface IStyledFriendsListItemProps {
  isSelected: boolean;
}

const getHoverColor = (theme: Theme, isSelected: boolean) => {
  if (theme.palette.mode === "dark" && !isSelected) {
    return theme.palette.grey[800];
  } else if (theme.palette.mode === "light" && !isSelected) {
    return theme.palette.grey[300];
  }
};

export const StyledFriendsListItem = styled.div<IStyledFriendsListItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 2px 5px;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  background-color: ${(props) =>
    props.isSelected ? props.theme.palette.secondary.dark : "inherit"};
  box-sizing: border-box;

  &:hover {
    background-color: ${(props) =>
      getHoverColor(props.theme, props.isSelected)};
  }

  &:last-child {
    margin-bottom: auto;
  }

  @media only screen and (max-width: 700px) and (min-width: 451px) and (hover: hover) and (pointer: fine) {
    span {
      color: ${(props) =>
        props.isSelected
          ? props.theme.palette.secondary.dark
          : props.theme.palette.background.default} !important;
    }

    &:hover {
      span {
        color: ${(props) =>
          getHoverColor(props.theme, props.isSelected)} !important;
      }
    }
  }

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    background-color: inherit;

    &:hover {
      background-color: ${(props) => getHoverColor(props.theme, false)};
    }
  }
`;
