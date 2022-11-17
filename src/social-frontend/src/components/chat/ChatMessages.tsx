import { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectChatMessages } from "../../slices/chatSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledChatMessages } from "../../styled/components/chat/StyledChatMessages";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
  const messages = useAppSelector(selectChatMessages);
  const user = useAppSelector(selectUserIdentity);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <StyledChatMessages>
      {messages.map((data, index) => (
        <ChatMessage
          key={index}
          message={data.message}
          isUserMessage={user.id === data.friendUserId}
        />
      ))}
      <div ref={messagesEndRef} />
    </StyledChatMessages>
  );
};

export default ChatMessages;
