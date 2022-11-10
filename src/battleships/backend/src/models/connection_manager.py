from email import message
from .player_game import PlayerGame
from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
import uuid, json
from typing import Dict
from ..ships.data import game_session_register, SessionGamePlayers
from ..ships.constants import *
from .websocket_message import *

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
        print(f"game_session_id: {game_session_id}")
        game_session = game_session_register.get(game_session_id)
        
        if game_session is None:
            print('error_invalid_game_session_id')
        else:
            for player_id in game_session.players.__dict__.values():
                if player_id != sender:
                    connection = self.active_connections.get(player_id) # connection: WebSocket
                    if connection is not None:
                        await connection.send_json(json.dumps(message.json()))
        
    async def send_short_info(self, addressee: str, res_type: MessageOutType, sender: str):
        connection = self.active_connections.get(addressee) # connection: WebSocket
        message = WebSocketErrorOut(
            id = str(uuid.uuid1()),
            id_server_res =  str(uuid.uuid1()),
            type = res_type.value,
            source = sender
        )
        if connection is not None:
            await connection.send_json(json.dumps(message.json()))
    
    async def send_data_info(self, addressee: str, res_type: MessageOutType, sender: str, id_req: str, session_game: SessionGamePlayers, player_game: PlayerGame):
        connection = self.active_connections.get(addressee) # connection: WebSocket
        message = WebSocketMessageOut(
            id = id_req,
            id_server_res =  str(uuid.uuid1()),
            type = res_type.value,
            source = sender,
            data = ResponseData(
                session_game_state = session_game.sessionGameState,
                player_game_state = player_game.game_state,
                my_board = player_game.my_board.get_matrix(),
                opponent_board = player_game.opponent_board.get_matrix(),
                my_board_name=player_game.player_name,
                my_board_info=player_game.my_board_info,
                my_board_enabled=player_game.my_board_enabled,
                opponent_board_info=player_game.opponent_board_info,
                opponent_board_name=player_game.opponent_name,
                opponent_board_enabled=player_game.opponent_board_enabled,
                next_ship_length_to_set=player_game.my_board.next_ship_length_to_set,
                h_allowed_places=player_game.my_board.h_allowed_places,
                v_allowed_places=player_game.my_board.v_allowed_places
            )
        )
        print(f'send_data_info to {addressee} {player_game}')
        
        if connection is not None:
            await connection.send_json(json.dumps(message.json()))
                    
        
