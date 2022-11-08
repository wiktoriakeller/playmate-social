import enum
from pydantic import BaseModel
from typing import Dict, TypedDict, List, Tuple, Union
from ..ships.constants import *

class WebSocketMessageIn(BaseModel):
    id: str
    type: str
    data: list

class ResponseData(TypedDict):
    session_game_state: SessionGameState
    player_game_state: PlayerGameState
    my_board: Dict[int, SquareItemState]
    opponent_board: Dict[int, SquareItemState]
    my_board_info: str
    my_board_name: str
    my_board_enabled: bool
    opponent_board_info: str
    opponent_board_name: str
    opponent_board_enabled: bool


class WebSocketMessageOut(BaseModel):
    id: str
    id_server_res: str
    type: int
    source: str
    data: ResponseData

class WebSocketErrorOut(BaseModel):
    id: str
    id_server_res: str
    type: int
    source: str
