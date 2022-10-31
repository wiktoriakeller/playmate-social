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

    async def handler_connection(self) -> None:
        if self.session_game_players.sessionGameState in(SessionGameState.CREATED, SessionGameState.CONNECTED, SessionGameState.DISCONNECTED):
            #ustaw przeciwnikowi ze jego przeciwnik jest polaczony
            self.session_game_players.set_state_opponent_player_game(self.player_game.player_id, True)
            #ustaw stan tury gracza na ustawianie statkow
            self.player_game.game_state = PlayerGameState.SETTING_SHIPS

            #przeciwnik polaczony przed nami
            if self.player_game.opponent_connected == True:
                self.session_game_players.sessionGameState = SessionGameState.CONNECTED
                #powiadom siebie
                await self.connection_manager.send_data_info(
                    addressee=self.player_game.player_id,
                    res_type=MessageOutType.OPPONENT_CONNECTED,
                    sender=self.player_game.player_id,
                    id_req=str(uuid.uuid1()),
                    session_game=self.session_game_players,
                    player_game=self.player_game
                    )
                #powiadom przecwinka
                await self.connection_manager.send_data_info(
                    addressee=self.player_game.opponent_id,
                    res_type=MessageOutType.OPPONENT_CONNECTED,
                    sender=self.player_game.player_id,
                    id_req=str(uuid.uuid1()),
                    session_game=self.session_game_players,
                    player_game=self.session_game_players.get_opponent_game(self.player_game.player_id)
                    )
            else:
                await self.connection_manager.send_short_info(self.player_game.player_id, MessageOutType.OPPONENT_DISCONNECTED, self.player_game.player_id)

        else:
            ## sesja gry zakonczona link niepoprawny
            ## TODO
            print('XD')
    
    def set_disconnect_opponent(self):
        self.session_game_players.sessionGameState = SessionGameState.DISCONNECTED
        self.session_game_players.set_state_opponent_player_game(self.player_game.player_id, False)

    def handler_message(self, messageIn: WebSocketMessageIn) -> None:
        if self.player_game.game_state in (PlayerGameState.START, PlayerGameState.SETTING_SHIPS):
            self.player_game.handler_start_or_setting_ships(messageIn=messageIn)
        else:
            pass

    
    def get_res(self, messageIn: WebSocketMessageIn) -> WebSocketMessageOut:
        print(type(self.player_game.my_board.get_matrix()))
        res = WebSocketMessageOut(
            data=ResponseData(
                session_game_state=self.session_game_players.sessionGameState,
                player_game_state=self.player_game.game_state,
                # session_game_state=SessionGameState.CONNECTED,
                # player_game_state=PlayerGameState.SETTING_SHIPS,
                my_board=self.player_game.my_board.get_matrix(),
                opponent_board=self.player_game.opponent_board.get_matrix()
            ),
            id=messageIn.id,
            type=MessageOutType.SETTING_SHIP.value,
            source=self.player_game.player_id, 
            id_server_res=str(uuid.uuid1())
        )
        return res
