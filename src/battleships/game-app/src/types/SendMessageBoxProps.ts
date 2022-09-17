import React from 'react';

import {WebSocketServiceProps} from './WebSocketServiceProps';

export interface SendMessageBoxProps extends WebSocketServiceProps {
    disabled: boolean;
    onSomething: Function;
  /** function that doesn't take or return anything (VERY COMMON) */
  //onClick: () => void;
  /** function type syntax that takes an event (VERY COMMON) */
  //onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
 
}