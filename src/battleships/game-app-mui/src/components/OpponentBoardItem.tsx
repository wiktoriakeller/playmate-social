import React, { useState, useCallback, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { WebSocketServiceProps } from "../types";
import { selectStateLastParsedMessage } from "../features/WSConfig/WSConfigSlice";

import "./components.css";
import OpponentBlankSquare from "./OpponentBlankSquare";
import MishitSquare from "./MishitSquare";
import OpponentHitSquare from "./OpponentHitSquare";
import SunkShipSquare from "./SunkShipSquare";

interface IOpponentBoardItem extends WebSocketServiceProps {
  id: number;
}

export function OpponentBoardItem({
  id,
  triggerSendObject,
}: IOpponentBoardItem) {
  const stateNewResponse = useAppSelector(selectStateLastParsedMessage);
  // console.log(typeof(stateNewResponse));
  if (id === 0) {
    return <div className="Item"></div>;
  } else if (id <= 10) {
    return <div className="Item">{id}</div>;
  } else if (id % 11 === 0) {
    return <div className="Item">{String.fromCharCode(id / 11 + 64)}</div>;
  } else if (stateNewResponse["data"]["opponent_board"][id] === 1) {
    return (
      <OpponentBlankSquare
        className="Item"
        id={id}
        triggerSendObject={triggerSendObject}
      ></OpponentBlankSquare>
    );
    // return (
    //   <SUNKENShipSquare
    //     className='Item'
    //     id={id}
    //     triggerSendMock={triggerSendMock}
    //     triggerSendObject={triggerSendObject}
    //   ></SUNKENShipSquare>
    // );
  } else if (stateNewResponse["data"]["opponent_board"][id] === 3) {
    return <MishitSquare className="Item" id={id}></MishitSquare>;
  } else if (stateNewResponse["data"]["opponent_board"][id] === 4) {
    return <OpponentHitSquare className="Item" id={id}></OpponentHitSquare>;
  } else if (stateNewResponse["data"]["opponent_board"][id] === 5) {
    return <SunkShipSquare className="Item" id={id}></SunkShipSquare>;
  } else {
    return <div>BLAD</div>;
  }
}
