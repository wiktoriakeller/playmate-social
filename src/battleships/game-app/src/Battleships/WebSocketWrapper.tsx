import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {SendMessageBox} from './SendMessageBox';
import {ReceiveMessageBox} from './ReceiveMessageBox';
import {JsonValue, WebSocketOptions} from '../types';
const options: WebSocketOptions = {
    share: true,
};

export const WebSocketWrapper = () => {
    //Public API that will echo messages sent to it back to the client
    const [socketUrl, setSocketUrl] = useState('ws://localhost:8000/battleships/ws/echo');
    const [messageHistory, setMessageHistory] = useState([]);

    const { 
        sendMessage, 
        lastMessage, 
        readyState, 
        sendJsonMessage, 
        lastJsonMessage 
    } = useWebSocket(
        socketUrl, 
        options
    );
    useEffect(() => {
        console.log(`lastJsonMessage ${lastJsonMessage}`);
        if (lastJsonMessage !== null) {
        setMessageHistory((prev) => prev.concat(lastJsonMessage));
        }
    }, [lastMessage, lastJsonMessage, setMessageHistory]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }[readyState];
        
    const handleSendJsonMessage = useCallback((jsonMessage: JsonValue, keep: boolean ) => {
        // sendJsonMessage(jsonMessage, true); TODO
        const mock = {
            type: 'haha',
            data: [0,1] 
        };
        sendJsonMessage(JSON.stringify(mock), true);
        alert(`Websocekt wyslal JSON ${jsonMessage}`);
    }, []);
    
    
    function handleOnSomething(){
        alert('alert');
    }

    return (
        <div>
            <span>The WebSocket is currently {connectionStatus}</span>
            {/* <p>{messageHistory}</p> */}
            {
                readyState !== ReadyState.OPEN
                ? <span> Waiting for reconnecting...</span>
                : <div>
                    <SendMessageBox  
                        disabled={false}
                        onSomething={handleOnSomething} 
                        eventLastJsonMessage={lastJsonMessage}
                        eventLastParsedMessage={JSON.parse(lastJsonMessage?.toString()||"\{\}")}
                        triggerSendJsonMessage={handleSendJsonMessage}
                        readyState={readyState}
                    ></SendMessageBox>
                    <br></br>
                    <ReceiveMessageBox 
                        disabled={false} 
                        onSomething={handleOnSomething}
                        eventLastJsonMessage={lastJsonMessage}
                        eventLastParsedMessage={JSON.parse(lastJsonMessage?.toString()||"\{\}")}
                        triggerSendJsonMessage={handleSendJsonMessage}
                        readyState={readyState}
                    ></ReceiveMessageBox>
                    
                </div>
            }
            
        </div>
    );
};