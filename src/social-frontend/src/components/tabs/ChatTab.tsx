import { useAppSelector } from "../../app/hooks";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { ChatContainer } from "../../styled/components/chat/ChatContainer";
import { FriendsContainer } from "../../styled/components/friends/FriendsContainer";
import { StyledDivider } from "../../styled/components/mui/StyledDivider";
import { StyledChatTab } from "../../styled/components/tabs/StyledChatTab";
import ChatHeader from "../chat/ChatHeader";
import ChatInput from "../chat/ChatInput";
import ChatMessages from "../chat/ChatMessages";
import FriendsLits from "../friendsList/FriendsLits";
import FriendsSearch from "../friendsList/FriendsSearch";

const ChatTab = () => {
  const selectedFriend = useAppSelector(selectSelectedFriend);

  return (
    <StyledChatTab>
      <FriendsContainer>
        <FriendsSearch />
        <FriendsLits />
      </FriendsContainer>
      <StyledDivider orientation="vertical" flexItem />
      <ChatContainer>
        {selectedFriend !== null ? (
          <>
            <ChatHeader />
            <ChatMessages />
            <ChatInput />
          </>
        ) : (
          <></>
        )}
      </ChatContainer>
    </StyledChatTab>
  );
};

export default ChatTab;
