import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Box, ClickAwayListener, Tooltip } from "@mui/material";
import Popper from "@mui/material/Popper";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
  Theme
} from "emoji-picker-react";
import { useCallback, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../slices/themeSlice";
import { EmojiPickerContainer } from "../../styled/components/chat/EmojiPickerContainer";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";

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
                  lazyLoadEmojis={false}
                  suggestedEmojisMode={SuggestionMode.RECENT}
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
