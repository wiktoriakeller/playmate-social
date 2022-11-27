import { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/hooks";
import { IChatMessage, selectChatMessages } from "../../slices/chatSlice";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledChatMessages } from "../../styled/components/chat/StyledChatMessages";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const messages = useAppSelector(selectChatMessages)[
    selectedFriend.id
  ] as IChatMessage[];
  const user = useAppSelector(selectUserIdentity);

  return (
    <StyledChatMessages>
      {messages !== undefined ? (
        messages.map((_, index) => (
          <ChatMessage
            key={index}
            message={messages[messages.length - 1 - index].message}
            isUserMessage={
              user.id === messages[messages.length - 1 - index].senderId
            }
          />
        ))
      ) : (
        <></>
      )}
    </StyledChatMessages>
  );
};

export default ChatMessages;
