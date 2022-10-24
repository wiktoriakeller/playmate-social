import {JsonValue} from '../JsonValue';
export interface IWSConfig{
    socketUrl: string|null,
    userId: string|null,
    gameSessionId: string|null
    stateLastParsedMessage: object
    
}