
import React,{ useEffect, useCallback, useState }  from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import {ReceiveMessageBoxProps} from '../types'



export function ReceiveMessageBox({
        disabled, 
        onSomething,
        readyState, 
        triggerSendJsonMessage,
        eventLastJsonMessage,
        eventLastParsedMessage
    }: ReceiveMessageBoxProps) {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
        if (eventLastParsedMessage !== null) {
            console.log(eventLastParsedMessage);
            // alert('Otrzymano JSON parse : ' + eventLastJsonMessage?.toString());
        }
        setCount(count+1);
        
    }, [eventLastJsonMessage]);
    
    return (
        <div className="MessageBox">
            <p>
                count: {count}
            </p>
            <label>
                Box:
                <textarea  disabled={true} className="BoxTextArea" value={JSON.stringify(eventLastParsedMessage)}  />
            </label>
        </div>
    );
}
