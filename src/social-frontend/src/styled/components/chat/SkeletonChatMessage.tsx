import styled from "@emotion/styled";
import { Skeleton, SkeletonProps } from "@mui/material";

export interface ISkeletonChatMessageProps extends SkeletonProps {
  width: string;
  height: string;
  withAvatar: boolean;
  isUserMessage: boolean;
}

export const SkeletonChatMessage = styled(Skeleton)<ISkeletonChatMessageProps>`
  width: 30%;
  height: 45px;
  margin: 0px
    ${(props) => (props.withAvatar || props.isUserMessage ? "7px" : "47px")};
`;
