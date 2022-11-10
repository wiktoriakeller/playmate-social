
interface IShipSquare {
    className:string
}
function ShipSquare(props:IShipSquare) {
    return <div className={`${props.className} MyBoardShipSquare`}>

    </div>;
}
export default ShipSquare;