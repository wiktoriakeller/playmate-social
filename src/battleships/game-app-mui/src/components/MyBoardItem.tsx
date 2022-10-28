import React, { useState, useCallback, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {WebSocketServiceProps} from '../types';

import './components.css'
import BlankSquare from './BlankSquare';

interface IMyBoardItem extends WebSocketServiceProps{
  id: number
}

export function MyBoardItem({id, triggerSendMock, triggerSendObject}: IMyBoardItem) {
  if(id == 0){
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
  else if(id%11 == 0){
    return (
      <div className='Item'>
          {String.fromCharCode( id/11 + 64 )}
      </div>
    );
  }else{
    return (
      <BlankSquare 
        className='Item' 
        id={id}
        triggerSendMock={triggerSendMock}
        triggerSendObject={triggerSendObject}
      ></BlankSquare>
    );
  }
  
}





