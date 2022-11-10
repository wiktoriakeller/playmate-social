from datetime import date
from email import message
from http.client import CREATED
from sys import prefix
from urllib import response
import uuid, json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List
from ..ships.constants import MessageOutType, SessionGameState
from ..models.player_game import PlayerGame

from ..models.create_game import CreateGameRequest, CreateGameResponse
from ..models.websocket_message import WebSocketMessageIn, WebSocketMessageOut, WebSocketErrorOut
from ..models.connection_manager import ConnectionManager
from ..ships.data import game_session_register, SessionGamePlayers, Players
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
        playerGame1=PlayerGame(player_id=req.usr_id_sender, player_name=req.name_sender, opponent_id=req.usr_id_receiver, opponent_name=req.name_receiver),
        playerGame2=PlayerGame(player_id=req.usr_id_receiver, player_name=req.name_receiver, opponent_id=req.usr_id_sender, opponent_name=req.name_sender)
    )
    print(f"register: {game_session_register}")
    print(f'CREATED GAME id:{session_id} users_id: {req.usr_id_sender} and {req.usr_id_receiver}')
    return CreateGameResponse(
        **req.dict(), 
        session_id=session_id,
        game_url_link_sender=f'http://localhost:3000/?userId={req.usr_id_sender}&gameSessionId={session_id}', #TODO
        game_url_link_receiver=f'http://localhost:3000/?userId={req.usr_id_receiver}&gameSessionId={session_id}'#TODO
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
    
    game_session = game_session_register.get(game_session_id, None)
    if game_session == None:
        print('ERROR invalid game_session')
        return
    player_game = game_session.get_player_game(client_id)
    if player_game == None:
        print('ERROR invalid client_id')
        return

    await manager.connect(websocket, client_id)
    print(f"open ws game_session_id:{game_session_id}, client_id:{client_id}")
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
                await player_game_manager.handler_message(messageIn)
                await player_game_manager.send_res_or_ping_opponent(messageIn)
            
                print('-----------------------------------------------------------------------')
    
    except WebSocketDisconnect:
        print (f"Disconnect {game_session_id}")
        manager.disconnect(websocket, client_id)
        player_game_manager.set_disconnect_opponent()
        await manager.send_short_info(player_game.opponent_id, MessageOutType.OPPONENT_DISCONNECTED, "server")
        


        