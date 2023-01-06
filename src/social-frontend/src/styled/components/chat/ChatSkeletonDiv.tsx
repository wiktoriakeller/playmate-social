import styled from "@emotion/styled";

export interface IChatSkeletonDivProps {
  isUserMessage: boolean;
}

export const ChatSkeletonDiv = styled.div<IChatSkeletonDivProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  justify-content: ${(props) =>
    props.isUserMessage ? "flex-end" : "flex-start"};
`;
