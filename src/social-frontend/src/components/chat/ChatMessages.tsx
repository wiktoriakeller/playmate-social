import { useAppSelector } from "../../app/hooks";
import { selectChatMessages } from "../../slices/chatSlice";
import { StyledChatMessages } from "../../styled/components/chat/StyledChatMessages";

const ChatMessages = () => {
  const messages = useAppSelector(selectChatMessages);

  return (
    <StyledChatMessages>
      {messages.map((data, index) => (
        <span key={index}>{data.message}</span>
      ))}
    </StyledChatMessages>
  );
};

export default ChatMessages;
