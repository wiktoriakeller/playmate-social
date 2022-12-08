import { Tooltip } from "@mui/material";
import { StyledChatMessage } from "../../styled/components/chat/StyledChatMessage";

export interface IChatMessageProps {
  message: string;
  isUserMessage: boolean;
  createdAt: string;
}

const ChatMessage = (props: IChatMessageProps) => {
  return (
    <Tooltip title={props.createdAt} placement="right">
      <StyledChatMessage isUserMessage={props.isUserMessage}>
        {props.message}
      </StyledChatMessage>
    </Tooltip>
  );
};

export default ChatMessage;
