import {JsonValue} from './JsonValue';

export interface WebSocketServiceProps  {
  triggerSendMock: (jsonMessage: JsonValue, keep: boolean ) => void,
  triggerSendObject: (message: Object, keep: boolean ) => void,
}