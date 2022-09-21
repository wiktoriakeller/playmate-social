from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
import uuid, json

class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)
    

    #JSON methods
    async def send_personal_message_json(self, message: str, websocket: WebSocket):
        await websocket.send_json(json.dumps(message.json())) 

    async def broadcast_json(self, message: str):
        for connection in self.active_connections:
            await connection.send_json(json.dumps(message.json()))