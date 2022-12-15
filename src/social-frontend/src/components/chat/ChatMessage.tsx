import { Button, Tooltip } from "@mui/material";
import { StyledChatMessage } from "../../styled/components/chat/StyledChatMessage";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { StyledJoinGameButton } from "../../styled/components/chat/StyledTextMessage";

export interface IChatMessageProps {
  message: string;
  isUserMessage: boolean;
  createdAt: string;
  joinGameUrl: string;
}

const ChatMessage = (props: IChatMessageProps) => {
  return (
    <Tooltip title={props.createdAt} placement="right">
      {props.joinGameUrl ? (
        <StyledJoinGameButton isUserMessage={props.isUserMessage}>
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={() => {
              window.open(props.joinGameUrl, "_blank");
            }}
            endIcon={<PlayCircleIcon />}
          >
            {props.message}
          </Button>
        </StyledJoinGameButton>
      ) : (
        <StyledChatMessage isUserMessage={props.isUserMessage}>
          {props.message}
        </StyledChatMessage>
      )}
    </Tooltip>
  );
};

export default ChatMessage;
