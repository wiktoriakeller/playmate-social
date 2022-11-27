import styled from "@emotion/styled";
import { StyledScrollbar } from "../scrollbar/StyledScrollbar";

export const StyledFriendsList = styled(StyledScrollbar)`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0px 10px;
  width: 100%;
  height: calc(100vh - 148px);
`;
