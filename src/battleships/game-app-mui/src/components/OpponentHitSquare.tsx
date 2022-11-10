import './components.css';
import {WebSocketServiceProps} from '../types';

interface IOpponentHitSquare  extends WebSocketServiceProps {
    className:string,
    id:number
}
function OpponentHitSquare(props:IOpponentHitSquare) {
    return <div className={`${props.className} OpponentHitSquare`}>
       <span className="cross">x</span>
    </div>;
}
export default OpponentHitSquare;