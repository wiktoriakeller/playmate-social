import { useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Tooltip } from "@mui/material";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import Popper from "@mui/material/Popper";
import EmojiPicker from "emoji-picker-react";
import { EmojiClickData } from 'emoji-picker-react';

export interface IChatEmojiPicker {
  onEmojiClick: (e: EmojiClickData) => void;
}
const ChatEmojiPicker = (props: IChatEmojiPicker) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <Tooltip title="Choose an emoji">
      <div>
        <StyledIconButton sx={{ padding: "3px" }} onClick={handleClick}>
          <EmojiEmotionsIcon />
        </StyledIconButton>
        <Popper id={id} open={open} anchorEl={anchorEl} placement="top-end">
          <EmojiPicker onEmojiClick={props.onEmojiClick}/>
        </Popper>
      </div>
    </Tooltip>
  );
};

export default ChatEmojiPicker;
