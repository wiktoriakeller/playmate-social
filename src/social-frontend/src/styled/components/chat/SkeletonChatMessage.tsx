import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import { IStyledChatMessageProps } from "./StyledChatMessage";

export const SkeletonChatMessage = styled(Skeleton)<IStyledChatMessageProps>`
  width: 48%;
  max-width: 500px;
  height: 50px;
  min-height: 50px;
  margin: 0px 20px;
  align-self: ${(props) => (props.isUserMessage ? "flex-end" : "flex-start")};
`;
