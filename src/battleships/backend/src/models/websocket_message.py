from pydantic import BaseModel
from typing import TypedDict, List, Tuple, Union
from ..ships.constants import *

class WebSocketMessageIn(BaseModel):
    id: str
    type: str
    data: list

class ResponseData(TypedDict):
    session_game_state: SessionGameState
    player_game_state: PlayerGameState
    my_board: List[Tuple[int, SquareItemState]]
    opponent_board: List[Tuple[int, SquareItemState]]

class WebSocketMessageOut(BaseModel):
    id: str
    id_server_res: str
    type: str
    source: str
    data: ResponseData

class WebSocketErrorOut(BaseModel):
    id: str
    id_server_res: str
    type: str
    source: str
