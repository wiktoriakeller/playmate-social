import { Avatar } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { StyledChatHeader } from "../../styled/components/chat/StyledChatHeader";

const ChatHeader = () => {
  const selectedUser = useAppSelector(selectSelectedFriend);
  return (
    <StyledChatHeader>
      <Avatar alt={selectedUser.username} />
      <span>{selectedUser?.username}</span>
    </StyledChatHeader>
  );
};

export default ChatHeader;
