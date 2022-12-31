import { useEffect, useMemo } from "react";
import { useLazyGetChatMessagesListQuery } from "../../api/chatMessages/chatMessagesApi";
import { IGetChatMessagesListResponse } from "../../api/chatMessages/responses/getChatMessagesListResponse";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addChatMessagesList, selectChatState } from "../../slices/chatSlice";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { openSnackbar, SnackbarSeverity } from "../../slices/snackbarSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { SkeletonChatMessage } from "../../styled/components/chat/SkeletonChatMessage";
import { StyledChatMessages } from "../../styled/components/chat/StyledChatMessages";
import ChatMessage from "./ChatMessage";

const ChatMessages = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserIdentity);
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const friendMessagesDictionary =
    useAppSelector(selectChatState)[selectedFriend.id];

  const [getChatMessagesLazy, { isLoading }] =
    useLazyGetChatMessagesListQuery();

  useEffect(() => {
    getChatMessagesLazy(
      {
        friendId: selectedFriend.id,
        userId: user.id
      },
      true
    )
      .unwrap()
      .then((response) => {
        if (
          !!response.data &&
          response.data.friendId === selectedFriend.id &&
          (friendMessagesDictionary?.messages === undefined ||
            friendMessagesDictionary?.canAddNewMessagesList)
        ) {
          dispatch(
            addChatMessagesList({
              ...response.data,
              pageNumber: 0,
              canAddNewMessagesList: true
            })
          );
        }
      })
      .catch(
        (error: {
          status: string | number;
          data: IGetChatMessagesListResponse;
        }) => {
          dispatch(
            openSnackbar({
              message: "Could not load chat messages",
              severity: SnackbarSeverity.Error,
              status: error.status
            })
          );
        }
      );
  }, [selectedFriend, friendMessagesDictionary, dispatch, getChatMessagesLazy]);

  const messagesSkeletons = useMemo(() => {
    const skeletons: React.ReactNode[] = [];
    for (let i = 0; i < 12; i++) {
      skeletons.push(<SkeletonChatMessage isUserMessage={i % 2 === 0} />);
    }

    return skeletons;
  }, []);

  return (
    <StyledChatMessages>
      {!!friendMessagesDictionary?.messages && !isLoading
        ? friendMessagesDictionary.messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.content}
              isUserMessage={user.id === message.senderId}
              createdAt={message.createdAt}
              joinGameUrl={message.joinGameUrl ?? ""}
            />
          ))
        : messagesSkeletons.map((item) => item)}
    </StyledChatMessages>
  );
};

export default ChatMessages;
