import { TextField } from "@mui/material";
import { StyledChatInput } from "../../styled/components/chat/StyledChatInput";

const ChatInput = () => {
  return (
    <StyledChatInput>
      <TextField
        fullWidth
        size="small"
        sx={{
          padding: "0px 5%"
        }}
      />
    </StyledChatInput>
  );
};

export default ChatInput;
