import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {SendMessageBox} from './SendMessageBox';
import {ReceiveMessageBox} from './ReceiveMessageBox';
import {JsonValue, WebSocketOptions} from '../types';
import {mockMessages} from './mockMessages';
const options: WebSocketOptions = {
    share: true,
    shouldReconnect: (e)=>{return true},
    onOpen: () => console.log('opened soket')

};

export const WebSocketWrapper = () => {
    //Public API that will echo messages sent to it back to the client
    const [messageHistory, setMessageHistory] = useState([]);
    const [userId, setUserId] = useState("user" + Math.floor(Math.random()*100));
    const [socketUrl, setSocketUrl] = useState(`ws://localhost:8000/battleships/ws/${userId}`); //TODO

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
        console.log('re-render wrapper socket:' + socketUrl);
        console.log(`lastJsonMessage ${lastJsonMessage}`);
        if (lastJsonMessage !== null) {
        setMessageHistory((prev) => prev.concat(lastJsonMessage));
        }
    }, [lastMessage, lastJsonMessage, setMessageHistory,socketUrl]);

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }[readyState];
        
    const handleSendJsonMessage = useCallback((jsonMessage: JsonValue, keep: boolean ) => {
        const mockEnum = jsonMessage || 'hello';
        const mockMessage = JSON.stringify(mockMessages[new String(mockEnum).toLowerCase()]) || JSON.stringify({"type": "error",data: ["invalid_mock"]});
        sendJsonMessage(mockMessage, true);
        console.log(`Websocekt wyslal na: ${socketUrl}, mock: ${mockMessage}`);
    }, []);

    const handleSendObjectMessage = useCallback((message: Object, keep: boolean ) => {
        // const mock = {
        //     type: 'haha',
        //     data: [0,1] 
        // };
        sendJsonMessage(JSON.stringify(message), true);
        console.log(`Websocekt wyslal na: ${socketUrl}, object: ${message}`);
    }, []);
    
    
    function handleOnSomething(){
        alert('alert');
    }

    const handleSetSocketUrl = useCallback((userId: string) => {
        setSocketUrl(`ws://localhost:8000/battleships/ws/${userId}`); //TODO
        console.log(`zmiana socektUrl na
        ,: ws://localhost:8000/battleships/ws/${userId}`);
    }, []);

    function handleChangeUserId(event:React.ChangeEvent<HTMLInputElement>) {
        setUserId( event.target.value);
    }
    function handleSubmit(event:React.SyntheticEvent) {
        event.preventDefault();
        setSocketUrl(`ws://localhost:8000/battleships/ws/${userId}`); //TODO
        console.log(`zmiana socektUrl na: ws://localhost:8000/battleships/ws/${userId}`);
    }

    return (
        <div>
            <span>The WebSocket is currently {connectionStatus}</span>
            {/* <p>{messageHistory}</p> */}
            {
                readyState !== ReadyState.OPEN
                ? <span> Waiting for reconnecting...</span>
                : <div>
                    <div>
                    <form onSubmit={handleSubmit}>                           
                        <label>
                        UserId:
                        <input  value={userId} onChange={handleChangeUserId} />
                        </label>
                        <input type="submit" value="Change" />
                    </form>
                    <p>
                        socket:{socketUrl}
                    </p>
                    </div>
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