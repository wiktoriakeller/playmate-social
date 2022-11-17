import { StyledChatMessage } from "../../styled/components/chat/StyledChatMessage";

export interface IChatMessageProps {
  message: string;
  isUserMessage: boolean;
}

const ChatMessage = (props: IChatMessageProps) => {
  return (
    <StyledChatMessage isUserMessage={props.isUserMessage}>
      {props.message}
    </StyledChatMessage>
  );
};

export default ChatMessage;
