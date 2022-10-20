import {WebSocketMessage} from '../types'
export let mockMessages: {[index: string]: WebSocketMessage} = {
    hello: {
        type: 'hello',
        data: [0,1]
    },
    stop: {
        type: 'stop',
        data: []
    },
}