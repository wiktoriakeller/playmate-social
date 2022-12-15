import { useEffect, useState } from "react";
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
  const [currentPageNumber, _] = useState(
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
    if (
      data !== undefined &&
      currentPageNumber != paginatedMessages?.currentPageNumber
    ) {
      dispatch(
        addChatMessagesList({
          ...data.data,
          pageNumber: currentPageNumber
        })
      );
    }
  }, [data]);

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
      {paginatedMessages?.messages !== undefined ? (
        paginatedMessages.messages.map((_, index) => (
          <ChatMessage
            key={index}
            message={paginatedMessages.messages[index].content}
            isUserMessage={
              user.id === paginatedMessages.messages[index].senderId
            }
            createdAt={paginatedMessages.messages[index].createdAt}
            isGameInvitation={
              paginatedMessages.messages[index].isGameInvitation ?? false
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
