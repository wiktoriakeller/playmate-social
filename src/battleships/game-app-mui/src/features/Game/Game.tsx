import React, { useState, useCallback, useEffect} from 'react';
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectStateLastParsedMessage} from '../WSConfig/WSConfigSlice';
import {setMyBoardInfo, setOpponentBoardInfo, selectGame} from './GameSlice';
import {WebSocketServiceProps} from '../../types';
import {MyBoard} from '../MyBoard/MyBoard';

export function Game({
        triggerSendMock,
        triggerSendObject
    }: WebSocketServiceProps
    ) {

    const dispatch = useAppDispatch();
    const stateChat = useAppSelector(selectGame);
    const stateNewResponse = useAppSelector(selectStateLastParsedMessage);
   
    useEffect(() => {
        console.log("re-render ");
      }, [stateNewResponse]);

    const [text, setText] = useState("");
    function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
        setText( event.target.value);
    }
    function handleSubmit(event:React.SyntheticEvent) {
        event.preventDefault();
        triggerSendMock(text, true);
    }

    // Game component - opponent connected
    console.log(`stateNewRes.type ${stateNewResponse['type']}`)
    console.log(`stateNewRes.type ${typeof(stateNewResponse['type'])}`)
    if(stateNewResponse['type'] === 2 || stateNewResponse['type'] === 1){
        return (
            <div>
                <p style={{"margin": '30px'}}>Game component</p>
                <div style={{"margin": '30px'}}>
                    <MyBoard 
                        triggerSendMock={triggerSendMock}
                        triggerSendObject={triggerSendObject}
                    ></MyBoard>
                </div>
            </div>
          );
    }
    // Waiting component - opponent disconnected
    else if(stateNewResponse['type'] === 3){
        return (
            <div>
                <p style={{"margin": '30px'}}>Waiting for opponent</p>
            </div>
          );
    }
    
}
