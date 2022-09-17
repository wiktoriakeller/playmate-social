
import React,{ useEffect, useCallback, useState }  from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import {ReceiveMessageBoxProps} from '../types'



export function ReceiveMessageBox({triggerSendJsonMessage,triggerSendMessage, eventLastMessage, eventLastJsonMessage, readyState, disabled, onSomething}: ReceiveMessageBoxProps) {
    const [count, setCount] = useState(0);
    const [text, setText] = useState("");


    function handleChange(event:React.ChangeEvent<HTMLTextAreaElement>) {
        setText( event.target.value);
    }
    useEffect(() => {
        if (eventLastMessage !== null) {
            console.log(eventLastJsonMessage);
            console.log(typeof(JSON.parse(eventLastJsonMessage?.toString())));
            alert('Otrzymano JSON parse : ' + eventLastJsonMessage?.toString());
        }
        setCount(count+1);
        
    }, [eventLastMessage, eventLastJsonMessage]);
    
    return (
        <div className="MessageBox">
            <p>
                count: {count}
            </p>
            <label>
                Box:
                <textarea  disabled={true} className="BoxTextArea" value={eventLastMessage?.data} onChange={handleChange} />
            </label>
        </div>
    );
}
