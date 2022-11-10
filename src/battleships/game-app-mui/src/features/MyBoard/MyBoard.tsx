import React, { useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {selectGame, toggleOrientation} from '../Game/GameSlice';
import {WebSocketServiceProps} from '../../types';
import Button from '@mui/material/Button';
import {MyBoardItem} from '../../components';
import '../../components/components.css';


export function MyBoard({
        triggerSendObject
    }: WebSocketServiceProps
    ) {

    const dispatch = useAppDispatch();
    const stateGame = useAppSelector(selectGame);
   
    useEffect(() => {
        console.log("re-render ");
      }, [stateGame]);

    function handleClick(e: React.MouseEvent<HTMLElement>) {
        e.preventDefault();
        console.log('click swap');
        
        dispatch(toggleOrientation());
    }
    return (
        <div>
            <Button  variant="outlined" size="small" onClick={handleClick}>
                Swap orientation
            </Button>
            <p style={{"margin": '10px'}}>{stateGame.myBoardName}'s ships    Info: {stateGame.myBoardInfo} </p>
            <div className='Grid11x11'>
                {Array.from(Array(11)).map((_, rowIndex) => (
                Array.from(Array(11)).map((_, colIndex) => (
                        <div className='DivItem' key={rowIndex*11+colIndex}>
                            <MyBoardItem 
                                id={rowIndex*11+colIndex} 
                                key={rowIndex*11+colIndex}
                                triggerSendObject={triggerSendObject}
                            ></MyBoardItem>
                        </div>
                    ))
                ))}
            </div>
        </div>
      );
}
