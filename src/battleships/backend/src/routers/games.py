from email import message
from http.client import CREATED
from sys import prefix
from urllib import response
import uuid, json
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from typing import List
from ..ships.constants import SessionGameState
from ..models.player_game import PlayerGame

from ..models.create_game import CreateGameRequest, CreateGameResponse
from ..models.websocket_message import WebSocketMessageIn, WebSocketMessageOut
from ..models.connection_manager import ConnectionManager
from ..dependencies import *
from ..data import game_session_register, SessionGamePlayers, Players
router = APIRouter(
    prefix="/battleships",
    tags=["games"]
)


@router.post("/session/create/", response_model=CreateGameResponse)
async def create_game_session(req: CreateGameRequest):
    session_id=str(uuid.uuid1())
    game_session_register[session_id] = SessionGamePlayers(
        players=Players(req.usr_id_sender, req.usr_id_receiver),
        sessionGameState=SessionGameState.CREATED,
        playerGame1=PlayerGame(player_id=req.usr_id_sender, opponent_id=req.usr_id_receiver),
        playerGame2=PlayerGame(player_id=req.usr_id_receiver, opponent_id=req.usr_id_sender)
    )
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





manager = ConnectionManager()


@router.get("/test2")
async def get():
    return HTMLResponse(html2)


@router.websocket("/ws/{game_session_id}/{client_id}")
async def websocket_endpoint(websocket: WebSocket, game_session_id:str, client_id: str):
    print(f"open ws game_session_id:{game_session_id}, client_id:{client_id}")
    await manager.connect(websocket, client_id)
    try:
        while True:
            message = await websocket.receive_json()
            decodedMessage = json.loads(message)
            try:
                messageIn = WebSocketMessageIn(**decodedMessage)

            except:
                await manager.send_personal_message_json({
                    type: "error"
                }, websocket) 
            else:
                
                messageOut = WebSocketMessageOut(**messageIn.dict(), source=client_id, id_server_res=str(uuid.uuid1()))
                await manager.send_personal_message_json(messageOut, websocket)
                await manager.broadcast_without_sender_json(
                    websocket=websocket,
                    message=messageOut,
                    game_session_id=game_session_id,
                    sender=client_id
                )
    
    except WebSocketDisconnect:
        print (f"Disconnect {game_session_id}")
        manager.disconnect(websocket, client_id)
        await manager.broadcast_without_sender_json(
            websocket=websocket,
            message=WebSocketMessageOut(
                id='undefined',
                type="error_disconnect_opponent", 
                source=client_id, data=[],
                id_server_res=str(uuid.uuid1())
            ),
            game_session_id=game_session_id,
            sender=client_id
        )


        