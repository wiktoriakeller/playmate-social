import React, { useState, useCallback, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectStateLastParsedMessage} from '../WSConfig/WSConfigSlice';
import {setMyBoardInfo, selectGame} from '../Game/GameSlice';
import {} from './MyBoardSlice';
import {WebSocketServiceProps} from '../../types';


export function MyBoard({
        triggerSendMock,
        triggerSendObject
    }: WebSocketServiceProps
    ) {

    const dispatch = useAppDispatch();
    const stateChat = useAppSelector(selectGame);
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
        MyBoard
    </div>
  );
}
