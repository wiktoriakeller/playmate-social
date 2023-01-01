import styled from "@emotion/styled";
import { Skeleton } from "@mui/material";
import { IStyledChatMessageProps } from "./StyledChatMessage";

export const SkeletonChatMessage = styled(Skeleton)<IStyledChatMessageProps>`
  width: 49%;
  height: 45px;
  padding: 0px 14px;
  align-self: ${(props) => (props.isUserMessage ? "flex-end" : "flex-start")};
`;
