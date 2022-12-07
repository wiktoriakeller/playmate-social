import { useState, useCallback } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Tooltip, ClickAwayListener, Box } from "@mui/material";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import { EmojiPickerContainer } from "../../styled/components/chat/EmojiPickerContainer";
import { selectTheme } from "../../slices/themeSlice";
import { useAppSelector } from "../../app/hooks";
import Popper from "@mui/material/Popper";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData, EmojiStyle, Theme } from "emoji-picker-react";

export interface IChatEmojiPicker {
  onEmojiClick: (e: EmojiClickData) => void;
  chatInputTextRef: React.MutableRefObject<HTMLInputElement>;
}
const ChatEmojiPicker = (props: IChatEmojiPicker) => {
  const themeMode = useAppSelector(selectTheme);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
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
                <EmojiPicker
                  onEmojiClick={props.onEmojiClick}
                  emojiStyle={EmojiStyle.GOOGLE}
                  theme={themeMode.theme as Theme}
                />
              </EmojiPickerContainer>
            </Box>
          </ClickAwayListener>
        </Popper>
      </div>
    </Tooltip>
  );
};

export default ChatEmojiPicker;
