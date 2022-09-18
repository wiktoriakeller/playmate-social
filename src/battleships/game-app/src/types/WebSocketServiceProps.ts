import React from 'react';
import {JsonValue} from './JsonValue';

export interface WebSocketServiceProps  {
  triggerSendJsonMessage: (jsonMessage: JsonValue, keep: boolean ) => void,
  triggerSendObjectMessage: (message: Object, keep: boolean ) => void,
  readyState: number,
  eventLastParsedMessage:object,
  eventLastJsonMessage: JsonValue | null
}