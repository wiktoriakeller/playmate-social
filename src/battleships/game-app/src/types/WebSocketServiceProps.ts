import React from 'react';
import {JsonValue} from './JsonValue';

export interface WebSocketServiceProps  {
  triggerSendMessage: (message: string, keep: boolean) => void,
  //jsonMessage must be JSON-parsable
  triggerSendJsonMessage: (jsonMessage: JsonValue, keep: boolean ) => void,
  //null before first received message
  eventLastMessage: WebSocketEventMap['message'] | null,
  //null before first received message. If message.data is not JSON parsable, then this will be a static empty object
  eventLastJsonMessage: JsonValue | null,
  // -1 if uninstantiated, otherwise follows WebSocket readyState mapping: 0: 'Connecting', 1 'OPEN', 2: 'CLOSING', 3: 'CLOSED'
  readyState: number,
}