from datetime import date
from email import message
from http.client import CREATED
from sys import prefix
from urllib import response
import uuid, json
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.responses import HTMLResponse
from typing import List
from ..ships.constants import MessageOutType, SessionGameState
from ..models.player_game import PlayerGame

from ..models.create_game import CreateGameRequest, CreateGameResponse
from ..models.websocket_message import WebSocketMessageIn, WebSocketMessageOut, WebSocketErrorOut
from ..models.connection_manager import ConnectionManager
from ..dependencies import *
from ..data import game_session_register, SessionGamePlayers, Players
from ..models.player_game_manager import PlayerGameManager

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
            


manager = ConnectionManager()

@router.websocket("/ws/{game_session_id}/{client_id}")
async def websocket_endpoint(websocket: WebSocket, game_session_id:str, client_id: str):
    print(f"open ws game_session_id:{game_session_id}, client_id:{client_id}")
    await manager.connect(websocket, client_id)
    game_session = game_session_register.get(game_session_id)
    player_game = game_session.get_player_game(client_id)
    player_game_manager = PlayerGameManager(game_session, manager, player_game)
    await player_game_manager.handler_connection()
    try:
        while True:
            message = await websocket.receive_json()
            decodedMessage = json.loads(message)
            try:
                messageIn = WebSocketMessageIn(**decodedMessage)
                print(f"req: {messageIn}")
            except:
                await manager.send_personal_message_json({
                    type: "error"
                }, websocket) 
            else:
                player_game_manager.handler_message(messageIn)
                res = player_game_manager.get_res(messageIn)
                await manager.send_personal_message_json(res, websocket)
                # print(f"res: {res}")
                # await manager.broadcast_without_sender_json(
                #     websocket=websocket,
                #     message=res,
                #     game_session_id=game_session_id,
                #     sender=client_id
                # )

                ### ECHOOOOOOOOOOOO
                # messageOut = WebSocketMessageOut(**messageIn.dict(), source=client_id, id_server_res=str(uuid.uuid1()))
                # await manager.send_personal_message_json(messageOut, websocket)
                # await manager.broadcast_without_sender_json(
                #     websocket=websocket,
                #     message=messageOut,
                #     game_session_id=game_session_id,
                #     sender=client_id
                # )
                ### ECHOOOOOOOOOOOOOO
    
    except WebSocketDisconnect:
        print (f"Disconnect {game_session_id}")
        manager.disconnect(websocket, client_id)
        player_game_manager.set_disconnect_opponent()
        await manager.send_short_info(player_game.opponent_id, MessageOutType.OPPONENT_DISCONNECTED, "server")
        # await manager.broadcast_without_sender_json(
        #     websocket=websocket,
        #     message=WebSocketErrorOut(
        #         id='undefined',
        #         type="error_disconnect_opponent", 
        #         source=client_id, data=[],
        #         id_server_res=str(uuid.uuid1()),
        #         date=None
        #     ),
        #     game_session_id=game_session_id,
        #     sender=client_id
        # )


        