import SendIcon from "@mui/icons-material/Send";
import { InputAdornment, Tooltip } from "@mui/material";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/storeHooks";
import { addChatMessage } from "../../slices/chatSlice";
import {
  selectSelectedFriend,
  setFriendLastChatMessage
} from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledChatInput } from "../../styled/components/chat/StyledChatInput";
import { StyledIconButton } from "../../styled/components/common/StyledIconButton";
import { StyledTextField } from "../../styled/components/common/StyledTextField";
import ChatEmojiPicker from "./ChatEmojiPicker";
import { EmojiClickData } from "emoji-picker-react";

const ChatInput = () => {
  const dispatch = useAppDispatch();
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const user = useAppSelector(selectUserIdentity);
  const [currentInput, setCurrentInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (currentInput !== "") {
      dispatch(
        addChatMessage({
          senderId: user.id,
          senderUsername: user.username,
          receiverId: selectedFriend.id,
          isCurrentUserReceiver: false,
          content: currentInput,
          createdAt: new Date().toISOString()
        })
      );

      dispatch(
        setFriendLastChatMessage({
          friendId: selectedFriend.id,
          senderId: user.id,
          senderUsername: user.username,
          content: currentInput
        })
      );

      setCurrentInput("");
    }
  };

  const changeInputMessage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentInput(event.target.value);
  };

  const handleOnEmojiClick = (emoji: EmojiClickData) => {
    setCurrentInput(currentInput + emoji.emoji);
  };

  return (
    <StyledChatInput>
      <form onSubmit={sendMessage} style={{ width: "100%" }}>
        <StyledTextField
          ref={inputRef}
          fullWidth
          multiline
          maxRows={2}
          onKeyDown={(event) => {
            if (event.key.toLocaleLowerCase() === "enter" && !event.shiftKey) {
              sendMessage(event);
            }
          }}
          value={currentInput}
          variant="outlined"
          placeholder={"Aa"}
          size="small"
          sx={{
            paddingRight: "5px"
          }}
          onChange={changeInputMessage}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <ChatEmojiPicker
                  onEmojiClick={handleOnEmojiClick}
                  chatInputTextRef={inputRef}
                />
              </InputAdornment>
            )
          }}
        />
      </form>
      <Tooltip title="Send">
        <StyledIconButton size="medium" onClick={sendMessage}>
          <SendIcon />
        </StyledIconButton>
      </Tooltip>
    </StyledChatInput>
  );
};

export default ChatInput;
