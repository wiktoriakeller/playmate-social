import { useAppSelector } from "../../app/hooks";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { StyledChatHeader } from "../../styled/components/chat/StyledChatHeader";

const ChatHeader = () => {
  const selectedUser = useAppSelector(selectSelectedFriend);
  return <StyledChatHeader>{selectedUser?.username}</StyledChatHeader>;
};

export default ChatHeader;
