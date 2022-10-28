import { nanoid } from '@reduxjs/toolkit';
import {WebSocketServiceProps} from '../types';

interface IBlankSquare extends WebSocketServiceProps{
    id:number,
    className:string
}
function BlankSquare(props:IBlankSquare) {
    function handleClick(e:React.MouseEvent<HTMLElement>){
        alert('clcik blank div');
        const data = JSON.stringify({
            id: nanoid(),
            type: 'BLANK_SQUARE_TO_SET',
            data: [props.id]
        });
        props.triggerSendObject(data, true);
    }
    
    return <div className={props.className} onClick={handleClick}>
        {props.id}
    </div>;
}
export default BlankSquare;