from email import message
from sys import prefix
from urllib import response
import uuid, json
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from typing import List

from ..models.create_game import CreateGameRequest, CreateGameResponse
from ..models.websocket_message import WebSocketMessageIn
from ..dependencies import *
from ..data import game_session_register, SessionGamePlayers
router = APIRouter(
    prefix="/battleships",
    tags=["games"]
)


@router.post("/session/create/", response_model=CreateGameResponse)
async def create_game_session(req: CreateGameRequest):
    session_id=str(uuid.uuid1())
    game_session_register[session_id] = SessionGamePlayers(req.usr_id_sender, req.usr_id_sender)
    print(f"register: {game_session_register}")
    return CreateGameResponse(
        **req.dict(), 
        session_id=session_id
    )


html = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var ws = new WebSocket("ws://localhost:8000/battleships/ws/echo");
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


@router.get("/test")
async def get():
    return HTMLResponse(html)



@router.websocket("/ws/test")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(data)

        # data = await websocket.receive_json()
        # await websocket.send_json(data) # json.dump
        
        # print(json.loads(data,))
        # print( type(json.loads(data)))



@router.websocket("/ws/echo")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        message = await websocket.receive_json()
        decodedMessage = json.loads(message)
        try:
            messageIn = WebSocketMessageIn(**decodedMessage)
            print('dobra mesin')
            print(messageIn)
            # await websocket.send_json(data) # json.dump
            await websocket.send_json(json.dumps(messageIn.json())) # json.dump

        except:
            print('niepoprwane meessIn ')
            await websocket.send_json(json.dumps({
                type: "error"
            })) # json.dump
            



html2 = """
<!DOCTYPE html>
<html>
    <head>
        <title>Chat</title>
    </head>
    <body>
        <h1>WebSocket Chat</h1>
        <h2>Your ID: <span id="ws-id"></span></h2>
        <form action="" onsubmit="sendMessage(event)">
            <input type="text" id="messageText" autocomplete="off"/>
            <button>Send</button>
        </form>
        <ul id='messages'>
        </ul>
        <script>
            var client_id = Date.now()
            document.querySelector("#ws-id").textContent = client_id;
            var ws = new WebSocket(`ws://localhost:8000/battleships/ws/${client_id}`);
            ws.onmessage = function(event) {
                var messages = document.getElementById('messages')
                var message = document.createElement('li')
                var content = document.createTextNode(event.data)
                message.appendChild(content)
                messages.appendChild(message)
            };
            function sendMessage(event) {
                var input = document.getElementById("messageText")
                ws.send(input.value)
                input.value = ''
                event.preventDefault()
            }
        </script>
    </body>
</html>
"""


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


manager = ConnectionManager()


@router.get("/test2")
async def get():
    return HTMLResponse(html2)


@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    print('websocket clientid')
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.send_personal_message(f"You wrote: {data}", websocket)
            await manager.broadcast(f"Client #{client_id} says: {data}")
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{client_id} left the chat")


