from ..ships.constants import *
from .Boards import *
from .websocket_message import WebSocketMessageIn, WebSocketMessageOut, ResponseData
import uuid
class PlayerGame():
    def __init__(self, player_id: str, opponent_id: str) -> None:
        self.player_id = player_id
        self.opponent_id = opponent_id
        self.game_state: PlayerGameState = PlayerGameState.START
        self.my_board = MyBoard()
        self.opponent_board = OpponentBoard()

    def handler_message(self, messageIn: WebSocketMessageIn) -> None:
        if self.game_state in (PlayerGameState.START, PlayerGameState.SETTING_SHIPS):
            if messageIn.type == MessageInType.BLANK_SQUARE_TO_SET:
                '''Dodaj ustawiony statek na swojej planszy'''
                for index in messageIn.data:
                    self.my_board.set_item_state(index, SquareItemState.SET_SHIP)
            else:
                pass
        else:
            pass

    def get_res(self, messageIn: WebSocketMessageIn) -> WebSocketMessageOut:
        print(type(self.my_board.get_matrix()))
        res = WebSocketMessageOut(
            data=ResponseData(
                session_game_state=SessionGameState.CONNECTED,
                player_game_state=PlayerGameState.SETTING_SHIPS,
                my_board=self.my_board.get_matrix(),
                opponent_board=self.opponent_board.get_matrix()
            ),
            id=messageIn.id,
            type=str(MessageOutType.SETTING_SHIP),
            source=self.player_id, 
            id_server_res=str(uuid.uuid1())
        )
        return res