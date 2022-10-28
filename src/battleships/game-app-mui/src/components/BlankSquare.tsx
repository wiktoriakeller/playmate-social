interface IBlankSquare{
    id:number,
    className:string
}
function BlankSquare(props:IBlankSquare) {
    function handleClick(e:React.MouseEvent<HTMLElement>){
        alert('clcik blank div');
    }
    
    return <div className={props.className} onClick={handleClick}>
        {props.id}
    </div>;
}
export default BlankSquare;