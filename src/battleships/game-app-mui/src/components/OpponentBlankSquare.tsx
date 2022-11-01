import { nanoid } from '@reduxjs/toolkit';
import {WebSocketServiceProps} from '../types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {toggleSending, setMyBoardInfo, setOpponentBoardInfo, selectGame} from './../features/Game/GameSlice';

interface IOpponentBlankSquare extends WebSocketServiceProps{
    id:number,
    className:string
}
function OpponentBlankSquare(props:IOpponentBlankSquare) {
    const dispatch = useAppDispatch();
    const stateGame = useAppSelector(selectGame);

    function handleClick(e:React.MouseEvent<HTMLElement>){
        if(stateGame.sendingEnabled == true && stateGame.opponentBoardInfo != "DISABLED"){
            alert('click shoot');
            const data = JSON.stringify({
                id: nanoid(),
                type: 'OPPONENT_BLANK_SQUARE_TO_SHOOT',
                data: [props.id]
            });
            props.triggerSendObject(data, true);
            dispatch(toggleSending(false));
        }
    }
    return <div className={props.className} onClick={handleClick}>
        .{props.id}
    </div>;
}
export default OpponentBlankSquare;