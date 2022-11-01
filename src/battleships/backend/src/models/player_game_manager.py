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
        print('handler_connection')
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

    async def ping_opponent_new_state(self, messageOutType: MessageOutType):
        print('ping_opponent')
        await self.connection_manager.send_short_info(
            addressee=self.player_game.opponent_id,
            res_type=messageOutType,
            sender="server"
        )
    
    def get_res_in_setting_ship(self, messageIn: WebSocketMessageIn) -> WebSocketMessageOut:
        print('get_res_in_setting_ship')
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

    async def handler_end_setting_ships(self):
        print('handler_end_setting_ships')
        # wszystkie statki zaznaczone
        if self.player_game.my_board.check_all_fleet_setting() == True:
            #przeciwnik juz mial ustawione wszystkie statki
            if self.session_game_players.get_opponent_game(self.player_game.player_id).game_state == PlayerGameState.END_SETTING_SHIPS:
                #ustaw sobie ze tura przeciwnika
                self.player_game.game_state = PlayerGameState.OPPONENT_ROUND
                #ustaw przeciwnikowi stan gry strzelanie
                self.session_game_players.get_opponent_game(self.player_game.player_id).game_state = PlayerGameState.SHOOTING
                await self.ping_opponent_new_state(MessageOutType.SHOOTING)
            #przeciwnik nie ma ustawionych wszystkich statkow
            else:
                #ustaw ze ma wszystkie ustawione
                self.player_game.game_state = PlayerGameState.WAIT_FOR_OPPONENT_END_SETTING_SHIPS
        else:
            pass

    async def handler_get_res_or_ping_opponent(self, messageIn: WebSocketMessageIn) -> WebSocketMessageOut:
        print('handler_get_res_or_ping_opponent')
        result: WebSocketMessageOut = None
        if self.player_game.game_state in (PlayerGameState.START, PlayerGameState.SETTING_SHIPS):
            result = self.get_res_in_setting_ship(messageIn)
        else:
            print('!!!!!!!!!! get res in other state')
        return result

    async def handler_message(self, messageIn: WebSocketMessageIn) -> None:
        print('handler_message')
        if self.player_game.game_state in (PlayerGameState.START, PlayerGameState.SETTING_SHIPS):
            self.player_game.handler_start_or_setting_ships(messageIn=messageIn)
            # await self.handler_end_setting_ships()
        else:
            print('handler message in other state')
            