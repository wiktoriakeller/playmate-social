import { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Tooltip, ClickAwayListener, Box } from "@mui/material";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import { EmojiPickerContainer } from "../../styled/components/chat/EmojiPickerContainer";
import Popper from "@mui/material/Popper";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from "emoji-picker-react";

export interface IChatEmojiPicker {
  onEmojiClick: (e: EmojiClickData) => void;
  chatInputTextRef: React.MutableRefObject<HTMLInputElement>;
}
const ChatEmojiPicker = (props: IChatEmojiPicker) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Tooltip title="Choose an emoji">
      <div>
        <StyledIconButton sx={{ padding: "3px" }} onClick={handleClick}>
          <EmojiEmotionsIcon />
        </StyledIconButton>
        <Popper
          open={open}
          anchorEl={props.chatInputTextRef.current}
          placement="top-end"
        >
          <ClickAwayListener onClickAway={handleClose}>
            <Box>
              <EmojiPickerContainer>
                <EmojiPicker onEmojiClick={props.onEmojiClick} />
              </EmojiPickerContainer>
            </Box>
          </ClickAwayListener>
        </Popper>
      </div>
    </Tooltip>
  );
};

export default ChatEmojiPicker;
