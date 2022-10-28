from ..ships.constants import *
from .Borads import *
class PlayerGame():
    def __init__(self, player_id: str, opponent_id: str) -> None:
        self.player_id = player_id
        self.opponent_id = opponent_id
        self.game_sate: PlayerGameState = PlayerGameState.START
        self.my_board = MyBoard()
        self.opponent_board = OpponentBoard()

