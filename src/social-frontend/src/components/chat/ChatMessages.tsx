import { useEffect, useMemo, useState } from "react";
import { useLazyGetChatMessagesListQuery } from "../../api/chatMessages/chatMessagesApi";
import { IGetChatMessagesListResponse } from "../../api/chatMessages/responses/getChatMessagesListResponse";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addChatMessagesList,
  selectChatMessages
} from "../../slices/chatSlice";
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

  const paginatedMessages =
    useAppSelector(selectChatMessages)[selectedFriend.id];

  const [currentPageNumber] = useState(
    paginatedMessages?.currentPageNumber ?? 1
  );

  const [getChatMessagesLazy, { isLoading, data }] =
    useLazyGetChatMessagesListQuery();

  useEffect(() => {
    getChatMessagesLazy(
      {
        friendId: selectedFriend.id
      },
      true
    )
      .unwrap()
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
  }, [selectedFriend, currentPageNumber, dispatch, getChatMessagesLazy]);

  useEffect(() => {
    if (!!data && currentPageNumber !== paginatedMessages?.currentPageNumber) {
      dispatch(
        addChatMessagesList({
          ...data.data,
          pageNumber: currentPageNumber
        })
      );
    }
  }, [data, dispatch, currentPageNumber, paginatedMessages?.currentPageNumber]);

  const messagesSkeletons = useMemo(() => {
    const skeletons: React.ReactNode[] = [];
    for (let i = 0; i < 12; i++) {
      skeletons.push(<SkeletonChatMessage isUserMessage={i % 2 === 0} />);
    }

    return skeletons;
  }, []);

  return (
    <StyledChatMessages>
      {paginatedMessages?.messages !== undefined && !isLoading
        ? paginatedMessages.messages.map((message, index) => (
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
