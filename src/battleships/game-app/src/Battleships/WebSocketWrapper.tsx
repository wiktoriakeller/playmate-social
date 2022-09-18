import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {SendMessageBox} from './SendMessageBox';
import {ReceiveMessageBox} from './ReceiveMessageBox';
import {JsonValue, WebSocketOptions} from '../types';
import {mockMessages} from './mockMessages';
const options: WebSocketOptions = {
    share: true,
    shouldReconnect: (e)=>{return true}
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
        const mockEnum = jsonMessage || 'hello';
        sendJsonMessage(JSON.stringify(mockMessages[new String(mockEnum).toLowerCase()]), true);
        alert(`Websocekt wyslal JSON ${JSON.stringify(mockMessages[new String(mockEnum).toLowerCase()])}`);
    }, []);

    const handleSendObjectMessage = useCallback((message: Object, keep: boolean ) => {
        // const mock = {
        //     type: 'haha',
        //     data: [0,1] 
        // };
        sendJsonMessage(JSON.stringify(message), true);
        alert(`Websocekt wyslal object JSON ${message}`);
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
                        triggerSendObjectMessage={handleSendObjectMessage}
                        readyState={readyState}
                    ></SendMessageBox>
                    <br></br>
                    <ReceiveMessageBox 
                        disabled={false} 
                        onSomething={handleOnSomething}
                        eventLastJsonMessage={lastJsonMessage}
                        eventLastParsedMessage={JSON.parse(lastJsonMessage?.toString()||"\{\}")}
                        triggerSendJsonMessage={handleSendJsonMessage}
                        triggerSendObjectMessage={handleSendObjectMessage}
                        readyState={readyState}
                    ></ReceiveMessageBox>
                    
                </div>
            }
            
        </div>
    );
};