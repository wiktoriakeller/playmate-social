import SendIcon from "@mui/icons-material/Send";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addChatMessage } from "../../slices/chatSlice";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledChatInput } from "../../styled/components/chat/StyledChatInput";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import { StyledTextField } from "../../styled/components/mui/StyledTextField";

const ChatInput = () => {
  const dispatch = useAppDispatch();
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const user = useAppSelector(selectUserIdentity);
  const [currentInput, setCurrentInput] = useState("");

  const sendMessage = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (currentInput !== "") {
      dispatch(
        addChatMessage({
          senderId: user.id,
          receiverId: selectedFriend.id,
          isCurrentUserReceiver: false,
          message: currentInput
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

  return (
    <StyledChatInput>
      <form onSubmit={sendMessage} style={{ width: "100%" }}>
        <StyledTextField
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
          placeholder={"Message"}
          size="small"
          sx={{
            padding: "0 2%"
          }}
          onChange={changeInputMessage}
        />
      </form>
      <Tooltip title="Send">
        <StyledIconButton
          sx={{ margin: "0px 1% 0px -1%", padding: "10px" }}
          size="large"
          onClick={sendMessage}
        >
          <SendIcon />
        </StyledIconButton>
      </Tooltip>
    </StyledChatInput>
  );
};

export default ChatInput;
