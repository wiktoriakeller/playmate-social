from enum import Enum

class SessionGameState(Enum):
    CREATED = 1 ################
    CONNECTED = 2 ###################
    DISCONNECTED = 3 ###############
    FINISHED = 4

class PlayerGameState(Enum):
    START = 1 #######
    SETTING_SHIPS = 2 #########
    END_SETTING_SHIPS = 0
    WAIT_FOR_OPPONENT_END_SETTING_SHIPS = 3 #########
    OPPONENT_ROUND = 4
    SHOOTING = 5


class SquareItemState(Enum):
    BLANK = 1 ##############
    SET_SHIP = 2 ###########

class MessageInType(Enum):
    BLANK_SQUARE_TO_SET = 1 ########################

class MessageOutType(Enum):
    SETTING_SHIP = 1 #####################################
    OPPONENT_CONNECTED = 2 ###############################
    OPPONENT_DISCONNECTED = 3 ############################
    OPPONENT_ROUND = 4
    SHOOTING = 5
    

SHIPS_FLEET = {
    1: 2,
    2: 1
    # 1: 4,# 4 jednomasztowce
    # 2: 3,
    # 3: 2,
    # 4: 1
}