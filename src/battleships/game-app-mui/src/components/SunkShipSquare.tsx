import './components.css';
import {WebSocketServiceProps} from '../types';

interface ISunkShipSquare  extends WebSocketServiceProps {
    className:string,
    id:number
}
function SunkShipSquare(props:ISunkShipSquare) {
    return <div className={`${props.className} SunkShipSquare`}>
       <span className="cross">x</span>
    </div>;
}
export default SunkShipSquare;