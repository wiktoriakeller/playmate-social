import { useEffect } from "react";
import { useLazyGetChatMessagesListQuery } from "../../api/chatMessages/chatMessagesApi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addChatMessagesList,
  selectChatMessages
} from "../../slices/chatSlice";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { SkeletonChatMessage } from "../../styled/components/chat/SkeletonChatMessage";
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
    getChatMessagesLazy({
      friendId: selectedFriend.id
    }).then((response) => {
      dispatch(addChatMessagesList(response.data.data));
    });
  }, [selectedFriend]);

  if (isLoading) {
    return (
      <StyledChatMessages>
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={false} />
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={false} />
        <SkeletonChatMessage isUserMessage={false} />
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={false} />
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={false} />
        <SkeletonChatMessage isUserMessage={true} />
        <SkeletonChatMessage isUserMessage={false} />
        <SkeletonChatMessage isUserMessage={true} />
      </StyledChatMessages>
    );
  }

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
