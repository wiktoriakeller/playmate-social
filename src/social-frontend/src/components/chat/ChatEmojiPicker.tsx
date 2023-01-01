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
import { useAppSelector } from "../../app/storeHooks";
import { selectThemeMode } from "../../slices/themeSlice";
import { EmojiPickerContainer } from "../../styled/components/chat/EmojiPickerContainer";
import { StyledIconButton } from "../../styled/components/common/StyledIconButton";

export interface IChatEmojiPicker {
  onEmojiClick: (e: EmojiClickData) => void;
  chatInputTextRef: React.MutableRefObject<HTMLInputElement>;
}

const ChatEmojiPicker = (props: IChatEmojiPicker) => {
  const themeMode = useAppSelector(selectThemeMode);
  const [open, setOpen] = useState(false);

  const handleClick = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <div>
      <Tooltip title="Choose an emoji">
        <StyledIconButton sx={{ padding: "3px" }} onClick={handleClick}>
          <EmojiEmotionsIcon />
        </StyledIconButton>
      </Tooltip>
      <Popper
        open={open}
        anchorEl={props.chatInputTextRef.current}
        placement="top-end"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Box>
            <EmojiPickerContainer>
              <EmojiPicker
                emojiVersion="1.0"
                onEmojiClick={props.onEmojiClick}
                emojiStyle={EmojiStyle.NATIVE}
                theme={themeMode.themeMode as Theme}
                lazyLoadEmojis={false}
                suggestedEmojisMode={SuggestionMode.RECENT}
              />
            </EmojiPickerContainer>
          </Box>
        </ClickAwayListener>
      </Popper>
    </div>
  );
};

export default ChatEmojiPicker;
