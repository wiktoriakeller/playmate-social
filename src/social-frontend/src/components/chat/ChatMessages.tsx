import { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectChatMessages } from "../../slices/chatSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledChatMessages } from "../../styled/components/chat/StyledChatMessages";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
  const messages = useAppSelector(selectChatMessages);
  const user = useAppSelector(selectUserIdentity);

  return (
    <StyledChatMessages>
      {messages.map((_, index) => (
        <ChatMessage
          key={index}
          message={messages[messages.length - 1 - index].message}
          isUserMessage={
            user.id === messages[messages.length - 1 - index].friendUserId
          }
        />
      ))}
    </StyledChatMessages>
  );
};

export default ChatMessages;
