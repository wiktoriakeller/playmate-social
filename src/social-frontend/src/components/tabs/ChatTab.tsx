import { ChatContainer } from "../../styled/components/chat/ChatContainer";
import { FriendsContainer } from "../../styled/components/friends/FriendsContainer";
import { StyledDivider } from "../../styled/components/mui/StyledDivider";
import { StyledChatTab } from "../../styled/components/tabs/StyledChatTab";
import ChatHeader from "../chat/ChatHeader";
import ChatInput from "../chat/ChatInput";
import ChatMessages from "../chat/ChatMessages";
import FriendsLits from "../friends/FriendsLits";
import FriendsSearch from "../friends/FriendsSearch";

const ChatTab = () => {
  return (
    <StyledChatTab>
      <FriendsContainer>
        <FriendsSearch />
        <FriendsLits />
      </FriendsContainer>
      <StyledDivider orientation="vertical" flexItem />
      <ChatContainer>
        <ChatHeader />
        <ChatMessages />
        <ChatInput />
      </ChatContainer>
    </StyledChatTab>
  );
};

export default ChatTab;
