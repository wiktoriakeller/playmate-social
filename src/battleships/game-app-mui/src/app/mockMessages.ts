import {WebSocketMessage} from '../types'
import { nanoid } from 'nanoid'
export let mockMessages: {[index: string]: WebSocketMessage} = {
    hello: {
        id: nanoid(),
        type: 'hello',
        data: [0,1]
    },
    stop: {
        id: nanoid(),
        type: 'stop',
        data: []
    },
}