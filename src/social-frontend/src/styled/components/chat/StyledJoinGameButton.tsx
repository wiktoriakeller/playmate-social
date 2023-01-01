import styled from "@emotion/styled";

export interface IStyledJoinGameButtonProps {
  isUserMessage: boolean;
}

export const StyledJoinGameButton = styled.div<IStyledJoinGameButtonProps>`
  width: fit-content;
  max-width: 50%;
  margin: 5px 20px;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  align-self: ${(props) => (props.isUserMessage ? "flex-end" : "flex-start")};
`;
