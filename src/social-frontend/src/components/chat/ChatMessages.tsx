import { useEffect } from "react";
import { useLazyGetChatMessagesListQuery } from "../../api/chatMessages/chatMessagesApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addChatMessagesList,
  selectChatMessages
} from "../../slices/chatSlice";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledChatMessages } from "../../styled/components/chat/StyledChatMessages";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserIdentity);
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const messages = useAppSelector(selectChatMessages)[selectedFriend.id];
  const [getChatMessagesLazy, { isLoading }] =
    useLazyGetChatMessagesListQuery();

  useEffect(() => {
    if (messages === undefined) {
      getChatMessagesLazy({
        friendId: selectedFriend.id
      }).then((response) => {
        dispatch(addChatMessagesList(response.data.data));
      });
    }
  }, []);

  return (
    <StyledChatMessages>
      {messages !== undefined ? (
        messages.map((_, index) => (
          <ChatMessage
            key={index}
            message={messages[index].content}
            isUserMessage={user.id === messages[index].senderId}
          />
        ))
      ) : (
        <></>
      )}
    </StyledChatMessages>
  );
};

export default ChatMessages;
