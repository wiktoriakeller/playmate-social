import React, { useState, useCallback, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {WebSocketServiceProps} from '../types';
import {selectStateLastParsedMessage} from '../features/WSConfig/WSConfigSlice';

import './components.css'
import OpponentBlankSquare from './OpponentBlankSquare';
import OpponentMishitSquare from './OpponentMishitSquare';

interface IOpponentBoardItem extends WebSocketServiceProps{
  id: number
}

export function OpponentBoardItem({id, triggerSendMock, triggerSendObject}: IOpponentBoardItem) {
  const stateNewResponse = useAppSelector(selectStateLastParsedMessage);
  // console.log(typeof(stateNewResponse));
  if(id === 0){
    return (
      <div className='Item' >
        
      </div>
    );
  }else if(id<=10){
    return (
      <div className='Item' >
          {id}
      </div>
    );
  }
  else if(id%11 === 0){
    return (
      <div className='Item'>
          {String.fromCharCode( id/11 + 64 )}
      </div>
    );
  }
  else if(stateNewResponse['data']['opponent_board'][id] === 1){
      // return (
      //   <OpponentBlankSquare 
      //     className='Item' 
      //     id={id}
      //     triggerSendMock={triggerSendMock}
      //     triggerSendObject={triggerSendObject}
      //   ></OpponentBlankSquare>
      // );
      return (
        <OpponentMishitSquare 
          className='Item' 
          id={id}
          triggerSendMock={triggerSendMock}
          triggerSendObject={triggerSendObject}
        ></OpponentMishitSquare>
      );
    }
    // else if(stateNewResponse['data']['opponent_board'][id] === 2){
    //   return(
    //   <OpponentShipSquare 
    //     className='Item'
    //   ></OpponentShipSquare>
    //   )
    // }else{
    //   return(
    //     <div></div>
    //   )
    // }
}



