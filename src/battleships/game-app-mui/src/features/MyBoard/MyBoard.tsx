import React, { useState, useCallback, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectStateLastParsedMessage} from '../WSConfig/WSConfigSlice';
import {setMyBoardInfo, selectGame} from '../Game/GameSlice';
import {} from './MyBoardSlice';
import {WebSocketServiceProps} from '../../types';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import {MyBoardItem} from '../../components';
import '../../components/components.css';


export function MyBoard({
        triggerSendMock,
        triggerSendObject
    }: WebSocketServiceProps
    ) {

    const dispatch = useAppDispatch();
    const stateGame = useAppSelector(selectGame);
    const stateReceiveObject = useAppSelector(selectStateLastParsedMessage);
   
    useEffect(() => {
        console.log("re-render ");
        console.log(stateReceiveObject["data"]["next_ship_length_to_set"]);
        console.log(typeof(stateReceiveObject["data"]["next_ship_length_to_set"]));

      }, [stateGame]);

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
            <p style={{"margin": '10px'}}>{stateGame.myBoardName}'s ships    Info: {stateGame.myBoardInfo} </p>

            <div className='Grid11x11'>
                {Array.from(Array(11)).map((_, rowIndex) => (
                Array.from(Array(11)).map((_, colIndex) => (
                        <div className='DivItem' key={rowIndex*11+colIndex}>
                            <MyBoardItem 
                                id={rowIndex*11+colIndex} 
                                key={rowIndex*11+colIndex}
                                triggerSendMock={triggerSendMock}
                                triggerSendObject={triggerSendObject}
                            ></MyBoardItem>
                        </div>
                    ))
                ))}
            </div>
        </div>
      );
}
