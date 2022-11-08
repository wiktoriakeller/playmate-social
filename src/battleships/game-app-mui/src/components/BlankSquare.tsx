import { nanoid } from '@reduxjs/toolkit';
import {WebSocketServiceProps} from '../types';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {toggleSending, setMyBoardInfo, setOpponentBoardInfo, selectGame} from './../features/Game/GameSlice';

interface IBlankSquare extends WebSocketServiceProps{
    id:number,
    className:string
}
function BlankSquare(props:IBlankSquare) {
    const dispatch = useAppDispatch();
    const stateGame = useAppSelector(selectGame);

    function handleClick(e:React.MouseEvent<HTMLElement>){
        console.log(`stateGame.myBoardEnabled: ${stateGame.myBoardEnabled}`);
        console.log(`stateGame.sendingEnabled == true: ${stateGame.sendingEnabled == true}`);
        if(stateGame.sendingEnabled == true && stateGame.myBoardEnabled){
            // alert('clcik blank div');
            const data = JSON.stringify({
                id: nanoid(),
                type: 'BLANK_SQUARE_TO_SET',
                data: [props.id]
            });
            props.triggerSendObject(data, true);
            dispatch(toggleSending(false));
        }
    }
    return <div className={props.className} onClick={handleClick}>
        {props.id}
    </div>;
}
export default BlankSquare;