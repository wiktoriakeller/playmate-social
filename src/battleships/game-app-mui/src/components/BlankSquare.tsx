import { nanoid } from "@reduxjs/toolkit";
import { WebSocketServiceProps } from "../types";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  toggleSending,
  setMyBoardInfo,
  setOpponentBoardInfo,
  selectGame,
  toggleFillingClassNameByIndex,
  toggleOrientation
} from "./../features/Game/GameSlice";

interface IBlankSquare extends WebSocketServiceProps {
  id: number;
  className: string;
  isAllowedVertical: boolean;
  isAllowedHorizontal: boolean;
  shipLength: number;
}
function BlankSquare(props: IBlankSquare) {
  const dispatch = useAppDispatch();
  const stateGame = useAppSelector(selectGame);
//   console.log(
//     `id: ${props.id} V: ${props.isAllowedHorizontal} H: ${props.isAllowedVertical}`
//   );
  function handleClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if(e.type === 'click'){
      console.log(`stateGame.myBoardEnabled: ${stateGame.myBoardEnabled}`);
      console.log(
        `stateGame.sendingEnabled == true: ${stateGame.sendingEnabled == true}`
      );
      if (stateGame.sendingEnabled == true && stateGame.myBoardEnabled) {
        const places = [];
        if(stateGame.orientation == "HORIZONTAL"){
          if(props.isAllowedHorizontal){
            for(let i=0; i< props.shipLength; i++){
              places.push(props.id + i);
            }
          }
        }
        else if(stateGame.orientation == "VERTICAL"){
          if(props.isAllowedVertical){
            for(let i=0; i< props.shipLength; i++){
              places.push(props.id + i*11);
            }
          }
        }else{
          console.log("ERROR");
        }
        alert('clcik and send ' + places.toString());
        const data = JSON.stringify({
          id: nanoid(),
          type: "BLANK_SQUARE_TO_SET",
          data: places,
        });
        props.triggerSendObject(data, true);
        dispatch(toggleSending(false));
      }
    }else if (e.type === 'contextmenu') {
      console.log("RIGHT CLICK");
      dispatch(toggleOrientation);
    }
  }
  function handleOnMouseEnter(e: React.MouseEvent<HTMLElement>) {
    if(stateGame.orientation == "HORIZONTAL"){
      console.log(props.shipLength + typeof(props.shipLength));
      if(props.isAllowedHorizontal){
        for(let i=0; i< props.shipLength; i++){
          dispatch(toggleFillingClassNameByIndex(props.id + i))
        }
      }
    }
    else if(stateGame.orientation == "VERTICAL"){
      if(props.isAllowedVertical){
        for(let i=0; i< props.shipLength; i++){
          dispatch(toggleFillingClassNameByIndex(props.id + i*11))
        }
      }
    }else{
      console.log("ERROR");
    }
  }

  return (
    <div className={props.className} onClick={handleClick} onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseEnter}>
      {props.id}
    </div>
  );
}
export default BlankSquare;
