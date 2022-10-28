import React, { useState, useCallback, useEffect} from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectWSConfig} from './WSConfigSlice';
import { JsonValue, WebSocketOptions } from "../../types";
import {receiveMessageToState} from './WSConfigSlice';
import {toggleSending} from '../Game/GameSlice';
import { mockMessages } from "../../app/mockMessages";
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
    const handleSendMock = useCallback(
      (jsonMessage: JsonValue, keep: boolean) => {
        const mockEnum = jsonMessage || "hello";
        const mockMessage = mockMessages[new String(mockEnum).toLowerCase()] || {
          id: nanoid(),
          type: "error",
          data: ["invalid_mock"],
        };
        const jsonData = JSON.stringify(mockMessage);
  
        sendJsonMessage(JSON.parse(JSON.stringify(jsonData)), true);
        console.log(`Websocekt wyslal na: ${stateWSConfig.socketUrl}, mock: ${jsonData}`);
      },
      []
    );
    useEffect(() => {
      console.log('socket:', stateWSConfig.socketUrl);
    }, []);

    useEffect(() => {
        if (lastJsonMessage !== null) {
            
            const parsedMessage = JSON.parse(lastJsonMessage?.toString());
            console.log(`Parsed message: ${parsedMessage}`);
            dispatch(receiveMessageToState(parsedMessage));
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
          <Chat
            triggerSendMock={handleSendMock}
            triggerSendObject={handleSendObject}
          ></Chat>
          <Game
            triggerSendMock={handleSendMock}
            triggerSendObject={handleSendObject}
        ></Game>
      </div>
  );
}
