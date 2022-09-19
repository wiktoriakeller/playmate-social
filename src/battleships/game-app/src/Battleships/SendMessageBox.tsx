import React,{ useEffect, useCallback, useState }  from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';


import {SendMessageBoxProps} from '../types'


export function SendMessageBox({
        disabled, 
        onSomething,
        readyState, 
        triggerSendJsonMessage,
        eventLastJsonMessage,
        eventLastParsedMessage
    }: SendMessageBoxProps) {
    const [text, setText] = useState("");
    const [count, setCount] = useState(0);

    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        
        setText( event.target.value);
    }
    function handleSubmit(event:React.SyntheticEvent) {
        event.preventDefault();
        triggerSendJsonMessage(text, true);
    }
    useEffect(() => {
        if (eventLastParsedMessage !== null) {
            setCount(count+1);
            console.log('re=render');
        }
    }, [eventLastJsonMessage]);

    return (
        <div className="MessageBox">
            <form onSubmit={handleSubmit}>
                <p>
                    count: {count}
                </p>
                <label>
                Box:
                <input  value={text} onChange={handleChange} />
                </label>
                <input type="submit" value="Wyślij" />
            </form>
        </div>
    );
}
