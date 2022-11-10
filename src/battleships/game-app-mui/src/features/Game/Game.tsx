import React, { useState, useCallback, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectStateLastParsedMessage } from "../WSConfig/WSConfigSlice";
import {
  setMyBoardInfo,
  setOpponentBoardInfo,
  selectGame,
  setMyBoardEnabled,
  setMyBoardName,
  setOpponentBoardEnabled,
  setOpponentBoardName,
} from "./GameSlice";
import { WebSocketServiceProps } from "../../types";
import { MyBoard } from "../MyBoard/MyBoard";
import { OpponentBoard } from "../OpponentBoard/OpponentBoard";

export function Game({
  triggerSendObject,
}: WebSocketServiceProps) {
  const dispatch = useAppDispatch();
  const stateChat = useAppSelector(selectGame);
  const stateNewResponse = useAppSelector(selectStateLastParsedMessage);

  useEffect(() => {
    console.log("re-render ");
  }, [stateNewResponse]);

  // const [text, setText] = useState("");
  // function handleChange(event:React.ChangeEvent<HTMLInputElement>) {
  //     setText( event.target.value);
  // }
  // function handleSubmit(event:React.SyntheticEvent) {
  //     event.preventDefault();
  //     triggerSendMock(text, true);
  // }

  // Game component - opponent connected
  console.log(`stateNewRes.type ${stateNewResponse["type"]}`);
  //   console.log(
  //     `stateNewRes.myboardAllowed ${stateNewResponse["data"]["h_allowed_places"]}`
  //   );
  //   console.log(
  //     `stateNewRes.myboardAllowed type ${typeof stateNewResponse["data"][
  //       "h_allowed_places"
  //     ]}`
  //   );
  //console.log(`stateNewRes.type ${typeof(stateNewResponse['type'])}`);
  //console.log(stateNewResponse);
  //console.log(`stateNewResponse["data"]["my_board_name"] ${stateNewResponse["data"]["my_board_name"]}`);
  if (stateNewResponse["type"] != undefined && stateNewResponse["type"] != 3) {
    dispatch(setMyBoardName(stateNewResponse["data"]["my_board_name"]));
    dispatch(setMyBoardInfo(stateNewResponse["data"]["my_board_info"]));
    dispatch(setMyBoardEnabled(stateNewResponse["data"]["my_board_enabled"]));
    dispatch(
      setOpponentBoardName(stateNewResponse["data"]["opponent_board_name"])
    );
    dispatch(
      setOpponentBoardInfo(stateNewResponse["data"]["opponent_board_info"])
    );
    dispatch(
      setOpponentBoardEnabled(
        stateNewResponse["data"]["opponent_board_enabled"]
      )
    );
  }

  // connected or setting_ship ["data"]["my_board"]
  if (stateNewResponse["type"] === 2 || stateNewResponse["type"] === 1) {
    return (
      <div>
        <p style={{ margin: "30px" }}>SETTING SHIPS</p>
        <div style={{ margin: "30px" }}>
          <MyBoard
            triggerSendObject={triggerSendObject}
          ></MyBoard>
        </div>
        <div style={{ margin: "30px" }}>
          <OpponentBoard
            triggerSendObject={triggerSendObject}
          ></OpponentBoard>
        </div>
      </div>
    );
  }
  // Waiting component - opponent disconnected
  else if (stateNewResponse["type"] === 3) {
    return (
      <div>
        <p style={{ margin: "30px" }}>Waiting for opponent</p>
      </div>
    );
  }
  // opponent round
  else if (stateNewResponse["type"] === 4) {
    // dispatch(setMyBoardInfo("DISABLED"));
    return (
      <div>
        <p style={{ margin: "30px" }}>OPPONENT ROUND</p>
        <div style={{ margin: "30px" }}>
          <MyBoard></MyBoard>
        </div>
        <div style={{ margin: "30px" }}>
          <OpponentBoard
            triggerSendObject={triggerSendObject}
          ></OpponentBoard>
        </div>
      </div>
    );
  }
  // shooting
  else if (stateNewResponse["type"] === 5) {
    return (
      <div>
        <p style={{ margin: "30px" }}>SHOOTING</p>
        <div style={{ margin: "30px" }}>
          <MyBoard></MyBoard>
        </div>
        <div style={{ margin: "30px" }}>
          <OpponentBoard
            triggerSendObject={triggerSendObject}
          ></OpponentBoard>
        </div>
      </div>
    );
  }
  // WIN
  else if (stateNewResponse["type"] === 6) {
    // dispatch(setOpponentBoardInfo("DISABLED"));
    return (
      <div>
        <p style={{ margin: "30px" }}>WIN</p>
        <div style={{ margin: "30px" }}>
          <MyBoard></MyBoard>
        </div>
        <div style={{ margin: "30px" }}>
          <OpponentBoard
            triggerSendObject={triggerSendObject}
          ></OpponentBoard>
        </div>
      </div>
    );
  }
  // BEFORE WIN
  else if (stateNewResponse["type"] === 8) {
    // dispatch(setOpponentBoardInfo("DISABLED"));
    return (
      <div>
        <p style={{ margin: "30px" }}> BEFORE WIN</p>
        <div style={{ margin: "30px" }}>
          <MyBoard></MyBoard>
        </div>
        <div style={{ margin: "30px" }}>
          <OpponentBoard
            triggerSendObject={triggerSendObject}
          ></OpponentBoard>
        </div>
      </div>
    );
  }
  // LOSS
  else if (stateNewResponse["type"] === 7) {
    // dispatch(setOpponentBoardInfo("DISABLED"));
    return (
      <div>
        <p style={{ margin: "30px" }}>LOSS</p>
        <div style={{ margin: "30px" }}>
          <MyBoard></MyBoard>
        </div>
        <div style={{ margin: "30px" }}>
          <OpponentBoard
            triggerSendObject={triggerSendObject}
          ></OpponentBoard>
        </div>
      </div>
    );
  }
}
