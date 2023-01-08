import styled from "@emotion/styled";
import { StyledScrollbar } from "../scrollbar/StyledScrollbar";

export const StyledFriendsList = styled(StyledScrollbar)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0px 10px;
  width: 315px;
  height: calc(100vh - 148px);
  box-sizing: border-box;

  @media only screen and (max-width: 450px),
    (hover: none) and (pointer: coarse) {
    width: 100%;
    height: calc(100vh - 126px);
  }
`;
