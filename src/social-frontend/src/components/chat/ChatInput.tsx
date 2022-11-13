import { TextField } from "@mui/material";
import { StyledChatInput } from "../../styled/components/chat/StyledChatInput";
import { RoundTextField } from "../../styled/components/mui/RoundTextField";

const ChatInput = () => {
  return (
    <StyledChatInput>
      <RoundTextField
        fullWidth
        variant="outlined"
        placeholder={"Message"}
        size="small"
        sx={{
          padding: "0px 6%"
        }}
      />
    </StyledChatInput>
  );
};

export default ChatInput;
