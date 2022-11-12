import styled from "@emotion/styled";

export interface IStyledFriendsListItemProps {
  isSelected: boolean;
}

export const StyledFriendsListItem = styled.div<IStyledFriendsListItemProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding: 2px 5px;
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  background-color: ${(props) =>
    props.isSelected ? props.theme.palette.secondary.dark : "inherit"};

  &:hover {
    background-color: ${(props) => {
      if (props.theme.palette.mode === "dark" && !props.isSelected) {
        return props.theme.palette.grey[800];
      } else if (props.theme.palette.mode === "light" && !props.isSelected) {
        return props.theme.palette.grey[400];
      }

      return "";
    }};
  }
`;
