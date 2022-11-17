import { HubConnectionBuilder, HubConnectionState } from "@microsoft/signalr";
import SendIcon from "@mui/icons-material/Send";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addChatMessage } from "../../slices/chatSlice";
import { selectSelectedFriend } from "../../slices/friendsListSlice";
import { selectUserIdentity } from "../../slices/userIdentitySlice";
import { StyledChatInput } from "../../styled/components/chat/StyledChatInput";
import { StyledIconButton } from "../../styled/components/mui/StyledIconButton";
import { StyledTextField } from "../../styled/components/mui/StyledTextField";

const apiUrl = process.env.REACT_APP_BASE_API_URL;
const hubUrl = `${apiUrl}/hubs/notifications`;

const ChatInput = () => {
  const dispatch = useAppDispatch();
  const selectedFriend = useAppSelector(selectSelectedFriend);
  const user = useAppSelector(selectUserIdentity);
  const [currentInput, setCurrentInput] = useState("");
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    const createNewConnection = async () => {
      if (
        !!connection &&
        connection.state !== HubConnectionState.Disconnected
      ) {
        await connection.stop();
      }

      const newConnection = new HubConnectionBuilder()
        .withUrl(hubUrl, {
          accessTokenFactory: () => user.jwtToken ?? ""
        })
        .withAutomaticReconnect()
        .build();

      setConnection(newConnection);
    };

    createNewConnection().catch((error) => console.log(error));
  }, [user.jwtToken]);

  useEffect(() => {
    if (!!connection) {
      connection.on("ReceiveChatMessage", (request) => {
        console.log(request);
        dispatch(
          addChatMessage({
            message: request.message,
            friendUserId: request.senderId,
            senderId: request.senderId
          })
        );
      });

      connection.start().catch((error) => console.log(error));
    }
  }, [connection, dispatch]);

  const sendMessage = async () => {
    if (
      currentInput !== "" &&
      connection.state === HubConnectionState.Connected
    ) {
      connection
        .send("SendChatMessage", {
          senderId: user.id,
          receiverId: selectedFriend.id,
          message: currentInput
        })
        .then(() => {
          dispatch(
            addChatMessage({
              message: currentInput,
              friendUserId: selectedFriend.id,
              senderId: user.id
            })
          );
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setCurrentInput("");
        });
    }
  };

  const changeInputMessage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCurrentInput(event.target.value);
  };

  return (
    <StyledChatInput>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          await sendMessage();
        }}
        style={{ width: "100%" }}
      >
        <StyledTextField
          fullWidth
          multiline
          maxRows={2}
          onKeyDown={async (event) => {
            if (event.key.toLocaleLowerCase() === "enter" && !event.shiftKey) {
              event.preventDefault();
              await sendMessage();
            }
          }}
          value={currentInput}
          variant="outlined"
          placeholder={"Message"}
          size="small"
          sx={{
            padding: "0 2%"
          }}
          onChange={changeInputMessage}
        />
      </form>
      <Tooltip title="Send">
        <StyledIconButton
          sx={{ margin: "0px 1% 0px -1%", padding: "10px" }}
          size="large"
          onClick={async (event) => {
            event.preventDefault();
            await sendMessage();
          }}
        >
          <SendIcon />
        </StyledIconButton>
      </Tooltip>
    </StyledChatInput>
  );
};

export default ChatInput;
