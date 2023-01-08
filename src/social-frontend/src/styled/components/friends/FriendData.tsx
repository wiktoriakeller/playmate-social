import styled from "@emotion/styled";

export interface IFriendsDataProps {
  isSelected: boolean;
}

export const FriendData = styled.div<IFriendsDataProps>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 1px;
  margin-left: 12px;
  margin-bottom: 2px;
  color: ${(props) =>
    props.isSelected
      ? props.theme.palette.common.white
      : props.theme.palette.text.primary};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  span:nth-of-type(2) {
    color: ${(props) =>
      props.isSelected
        ? props.theme.palette.common.white
        : props.theme.palette.text.secondary};
  }

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    color: ${(props) => props.theme.palette.text.primary};

    span:nth-of-type(2) {
      color: ${(props) => props.theme.palette.text.secondary};
    }
  }
`;
