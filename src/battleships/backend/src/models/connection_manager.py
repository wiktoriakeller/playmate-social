from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
import uuid, json
from typing import Dict
from ..data import game_session_register, Players
from .websocket_message import WebSocketMessageOut

class ConnectionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections[client_id] = websocket

    def disconnect(self, websocket: WebSocket, client_id: str):
        self.active_connections.pop(client_id, None)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for client_id, connection in self.active_connections.items():
            await connection.send_text(message)
    

    #JSON methods
    async def send_personal_message_json(self, message: str, websocket: WebSocket):
        await websocket.send_json(json.dumps(message.json())) 

    async def broadcast_without_sender_json(self, websocket: WebSocket, message: str, game_session_id: str, sender: str):
        # print(f"game_session_id: {game_session_id}")
        game_session = game_session_register.get(game_session_id)
        
        if game_session is None:
            print('error_invalid_game_session_id')
        else:
            for player_id in game_session.players.__dict__.values():
                if player_id != sender:
                    connection = self.active_connections.get(player_id) # connection: WebSocket
                    if connection is not None:
                        await connection.send_json(json.dumps(message.json()))
        
