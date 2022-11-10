import React, { useState, useCallback, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectStateLastParsedMessage} from '../WSConfig/WSConfigSlice';
import {setMyBoardInfo, selectGame} from '../Game/GameSlice';
import {} from './OpponentBoardSlice';
import {WebSocketServiceProps} from '../../types';
import {OpponentBoardItem} from '../../components';
import '../../components/components.css';


export function OpponentBoard({
        triggerSendObject
    }: WebSocketServiceProps
    ) {

    const dispatch = useAppDispatch();
    const stateGame = useAppSelector(selectGame);
    const stateReceiveObject = useAppSelector(selectStateLastParsedMessage);
   
    useEffect(() => {
        console.log("re-render ");
      }, [stateGame]);


    return (
        <div>
            <p style={{"margin": '10px'}}>{stateGame.opponentBoardName}'s ships     Info:{stateGame.opponentBoardInfo}</p>
            <div className='Grid11x11'>
                {Array.from(Array(11)).map((_, rowIndex) => (
                Array.from(Array(11)).map((_, colIndex) => (
                        <div className='DivItem' key={rowIndex*11+colIndex}>
                            <OpponentBoardItem 
                                id={rowIndex*11+colIndex} 
                                key={rowIndex*11+colIndex}
                                triggerSendObject={triggerSendObject}
                            ></OpponentBoardItem>
                        </div>
                    ))
                ))}
            </div>
        </div>
      );
}
