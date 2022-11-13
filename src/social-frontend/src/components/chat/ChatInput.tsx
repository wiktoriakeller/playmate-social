import { StyledChatInput } from "../../styled/components/chat/StyledChatInput";
import { StyledTextField } from "../../styled/components/mui/StyledTextField";

const ChatInput = () => {
  return (
    <StyledChatInput>
      <StyledTextField
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
