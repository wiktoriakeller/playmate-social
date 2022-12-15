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
  }, [selectedFriend, currentPageNumber]);

  useEffect(() => {
    if (!!data && currentPageNumber !== paginatedMessages?.currentPageNumber) {
      dispatch(
        addChatMessagesList({
          ...data.data,
          pageNumber: currentPageNumber
        })
      );
    }
  }, [data]);

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
        ? paginatedMessages.messages.map((_, index) => (
            <ChatMessage
              key={index}
              message={paginatedMessages.messages[index].content}
              isUserMessage={
                user.id === paginatedMessages.messages[index].senderId
              }
              createdAt={paginatedMessages.messages[index].createdAt}
              joinGameUrl={paginatedMessages.messages[index].joinGameUrl ?? ""}
            />
          ))
        : messagesSkeletons.map((item) => item)}
    </StyledChatMessages>
  );
};

export default ChatMessages;
