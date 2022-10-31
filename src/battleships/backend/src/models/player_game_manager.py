from ..ships.constants import *
from .Boards import *
from .websocket_message import WebSocketMessageIn, WebSocketMessageOut, ResponseData
from .connection_manager import ConnectionManager
from .player_game import PlayerGame
from ..data import SessionGamePlayers
import uuid

class PlayerGameManager():
    def __init__(self, sessionGamePlayers: SessionGamePlayers, connectionManager: ConnectionManager, playerGame: PlayerGame) -> None:
        self.connection_manager = connectionManager
        self.session_game_players = sessionGamePlayers
        self.player_game = playerGame

    # def set_connection_manager(self, connection_manager: ConnectionManager) -> None:
    #     self.connection_manager: ConnectionManager = connection_manager 

    def handler_message(self, messageIn: WebSocketMessageIn) -> None:
        if self.player_game.game_state in (PlayerGameState.START, PlayerGameState.SETTING_SHIPS):
            self.player_game.handler_start_or_setting_ships(messageIn=messageIn)
        else:
            pass

    def get_res(self, messageIn: WebSocketMessageIn) -> WebSocketMessageOut:
        print(type(self.player_game.my_board.get_matrix()))
        res = WebSocketMessageOut(
            data=ResponseData(
                session_game_state=SessionGameState.CONNECTED,
                player_game_state=PlayerGameState.SETTING_SHIPS,
                my_board=self.player_game.my_board.get_matrix(),
                opponent_board=self.player_game.opponent_board.get_matrix()
            ),
            id=messageIn.id,
            type=str(MessageOutType.SETTING_SHIP),
            source=self.player_game.player_id, 
            id_server_res=str(uuid.uuid1())
        )
        return res
