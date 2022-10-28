from enum import Enum

class SessionGameState(Enum):
    CREATED = 1 

class PlayerGameState(Enum):
    START = 1
    SETTING_SHIPS = 2

class SquareItemState(Enum):
    BLANK = 1
    SET_SHIP = 2