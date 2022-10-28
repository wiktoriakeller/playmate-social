import React, { useState, useCallback, useEffect} from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {WebSocketServiceProps} from '../types';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import './components.css'
interface IMyBoardItem{
  id: number
}

export function MyBoardItem({id}: IMyBoardItem) {
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
      <div className='Item'>
          {id}
      </div>
    );
  }
  
}





