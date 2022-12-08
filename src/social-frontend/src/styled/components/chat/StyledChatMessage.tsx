import styled from "@emotion/styled";

export interface StyledChatMessageProps {
  isUserMessage: boolean;
}

export const StyledChatMessage = styled.div<StyledChatMessageProps>`
  padding: 4px 10px;
  width: fit-content;
  max-width: 50%;
  background-color: ${(props) => props.theme.palette.secondary.main};
  color: ${(props) => props.theme.palette.white};
  border-radius: ${(props) => `${props.theme.shape.borderRadius}px`};
  margin: 5px 20px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  align-self: ${(props) => (props.isUserMessage ? "flex-end" : "flex-start")};
`;
