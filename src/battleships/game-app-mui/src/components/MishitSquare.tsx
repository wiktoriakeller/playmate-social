import './components.css';
import {WebSocketServiceProps} from '../types';

interface IOpponentMishitSquare  extends WebSocketServiceProps {
    className:string,
    id:number
}
function OpponentMishitSquare(props:IOpponentMishitSquare) {
    return <div className={`${props.className} OpponentMishitSquare`}>
       <span className="dot"></span>
    </div>;
}
export default OpponentMishitSquare;