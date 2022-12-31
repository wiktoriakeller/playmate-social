import styled from "@emotion/styled";
import { StyledScrollbar } from "../scrollbar/StyledScrollbar";

export const StyledChatMessages = styled(StyledScrollbar)`
  width: 100%;
  height: calc(100vh - 182px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;
  overflow-y: scroll;
  scroll-behavior: smooth;
  flex-direction: column-reverse;
  padding: 6px 14px;
  gap: 6px;
  box-sizing: border-box;
`;
