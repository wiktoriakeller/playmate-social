interface IShipSquare{
    name:string
}
function ShipSquare(props:IShipSquare) {
    return <h1>Hello, {props.name}</h1>;
}
export default ShipSquare;