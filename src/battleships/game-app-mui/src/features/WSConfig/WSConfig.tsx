import React, { useState, useCallback, useEffect} from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectWSConfig} from './WSConfigSlice';
import { WebSocketOptions } from "../../types";
import {receiveMessageToState} from './WSConfigSlice';
import {toggleSending} from '../Game/GameSlice';
import {Chat} from './../Chat/Chat';
import {Game} from './../Game/Game';
import { nanoid } from 'nanoid';


const options: WebSocketOptions = {
    share: true,
    shouldReconnect: (e) => {
      return true;
    },
    onOpen: () => console.log("opened soket"),
  };

export function WSConfig() {
    const dispatch = useAppDispatch();
    const stateWSConfig = useAppSelector(selectWSConfig);
    const [messageHistory, setMessageHistory] = useState([]);

    //WS
    const {
        sendMessage,
        lastMessage,
        readyState,
        sendJsonMessage,
        lastJsonMessage,
      } = useWebSocket(stateWSConfig.socketUrl, options);
    const handleSendObject = useCallback(
      (message: Object, keep: boolean) => {
        sendJsonMessage(JSON.parse(JSON.stringify(message)), true);
        console.log(`Websocekt wyslal na: ${stateWSConfig.socketUrl}, object: ${message}`);
      }, []
    );
    
    useEffect(() => {
      console.log('socket:', stateWSConfig.socketUrl);
    }, []);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            
            const parsedMessage = JSON.parse(lastJsonMessage?.toString());
            console.log(`Parsed message: ${parsedMessage}`);
            console.log('typeof ', typeof(JSON.parse(parsedMessage)));
            dispatch(receiveMessageToState(JSON.parse(parsedMessage)));
            dispatch(toggleSending(true));
        }
    }, [lastMessage, lastJsonMessage, setMessageHistory, stateWSConfig.socketUrl]);
    const connectionStatus = {
        [ReadyState.CONNECTING]: "Connecting",
        [ReadyState.OPEN]: "Open",
        [ReadyState.CLOSING]: "Closing",
        [ReadyState.CLOSED]: "Closed",
        [ReadyState.UNINSTANTIATED]: "Uninstantiated",
    }[readyState];
    //WS

    return (
      <div>
          <div>
            <p>
              userId: {stateWSConfig.userId}{" | "}
              gameSessionId: {stateWSConfig.gameSessionId}{" | "}
              socketUrl: {stateWSConfig.socketUrl}{" | "}
              connection: {connectionStatus}
            </p>
          </div>
          {/* <Chat
            triggerSendMock={handleSendMock}
            triggerSendObject={handleSendObject}
          ></Chat> */}
          <Game
            triggerSendObject={handleSendObject}
        ></Game>
      </div>
  );
}
