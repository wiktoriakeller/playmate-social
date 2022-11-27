import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Tooltip } from "@mui/material";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";

const ChatEmojiPicker = () => {
  return (
    <Tooltip title="Choose an emoji">
      <StyledIconButton sx={{ padding: "3px" }}>
        <EmojiEmotionsIcon />
      </StyledIconButton>
    </Tooltip>
  );
};

export default ChatEmojiPicker;
