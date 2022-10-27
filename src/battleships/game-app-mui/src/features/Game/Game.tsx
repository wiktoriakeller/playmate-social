import React, { useState, useCallback, useEffect} from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectStateLastParsedMessage} from '../WSConfig/WSConfigSlice';
import {toggleSending, selectChat} from './ChatSlice';
import {WebSocketServiceProps} from '../../types';


export function Chat({
        triggerSendMock,
        triggerSendObject
    }: WebSocketServiceProps
    ) {

    const dispatch = useAppDispatch();
    const stateChat = useAppSelector(selectChat);
    const stateReceiveObject = useAppSelector(selectStateLastParsedMessage);
   
    useEffect(() => {
        console.log("re-render "+JSON.stringify(stateReceiveObject));
      }, [stateReceiveObject]);

    const [text, setText] = useState("");
    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        setText( event.target.value);
    }
    function handleSubmit(event:React.SyntheticEvent) {
        event.preventDefault();
        triggerSendMock(text, true);
    }

    return (
    <div>
        <div className="MessageBox">
            <textarea  style={{minWidth: '600px', minHeight:'200px'}} className="BoxTextArea" onChange={()=>{}} value={JSON.stringify(stateReceiveObject)}/>
        </div>
        <div className="MessageBox">
            <form onSubmit={handleSubmit}>
                <label>
                Box:
                <input  value={text} onChange={handleChange} />
                </label>
                <input type="submit" value="Wyślij" />
            </form>
        </div>
    </div>
  );
}
