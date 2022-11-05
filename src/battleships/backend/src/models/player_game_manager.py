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
                print(f'self.player_game.player_id: {self.player_game.player_id} \
                    self.session_game_players.get_opponent_game{self.session_game_players.get_opponent_game(self.player_game.player_id)}\
                     self.player_game: {self.player_game}')
                print('powiadom siebie')
                await self.connection_manager.send_data_info(
                    addressee=self.player_game.player_id,
                    res_type=MessageOutType.OPPONENT_CONNECTED,
                    sender=self.player_game.player_id,
                    id_req=str(uuid.uuid1()),
                    session_game=self.session_game_players,
                    player_game=self.player_game
                    )
                #powiadom przecwinka
                print('powiadom przeciwnka')
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
        await self.connection_manager.send_data_info(
            addressee=self.player_game.opponent_id,
            res_type=messageOutType,
            sender="server",
            id_req="ping",
            session_game=self.session_game_players,
            player_game=self.session_game_players.get_opponent_game(self.player_game.player_id)
        )
    
    async def send_res_in_setting_ship(self, messageIn: WebSocketMessageIn) -> None:
        print('send_res_in_setting_ship')
        await self.connection_manager.send_data_info(
            addressee=self.player_game.player_id,
            res_type=MessageOutType.SETTING_SHIP,
            sender=self.player_game.player_id,
            id_req=messageIn.id,
            session_game=self.session_game_players,
            player_game=self.player_game
            )

    async def send_res_in_wait_for_opponent_end_setting_ships(self, messageIn: WebSocketMessageIn) -> None:
        print('get_res_in_wait_for_opponent_end_setting_ships')
        await self.connection_manager.send_data_info(
            addressee=self.player_game.player_id,
            res_type=MessageOutType.OPPONENT_ROUND,
            sender=self.player_game.player_id,
            id_req=messageIn.id,
            session_game=self.session_game_players,
            player_game=self.player_game
            )
    
    async def send_res_in_opponent_round(self, messageIn: WebSocketMessageIn) -> None:
        print('get_res_in_opponent_round')
        await self.connection_manager.send_data_info(
            addressee=self.player_game.player_id,
            res_type=MessageOutType.OPPONENT_ROUND,
            sender=self.player_game.player_id,
            id_req=messageIn.id,
            session_game=self.session_game_players,
            player_game=self.player_game
            )
    async def send_res_in_shooting(self, messageIn: WebSocketMessageIn) -> None:
        print('send_res_in_shooting')
        await self.connection_manager.send_data_info(
            addressee=self.player_game.player_id,
            res_type=MessageOutType.OPPONENT_ROUND,
            sender=self.player_game.player_id,
            id_req=messageIn.id,
            session_game=self.session_game_players,
            player_game=self.player_game
            )
    
    async def set_opponenet_ships_to_guess(self, data: Dict) -> None:
        print('send_ships_to_guess_to_opponent')
        self.session_game_players.get_opponent_game(self.player_game.player_id).ships_to_guess = data

    async def handler_shooting(self, messageIn: WebSocketMessageIn) -> None:
        
        print(f"handeler message in shooting")
        if MessageInType[messageIn.type] == MessageInType.OPPONENT_BLANK_SQUARE_TO_SHOOT:
            print(f"messageIn.data: {messageIn.data}")
            counter_guessed = 0
            counter_sunken_ship = 0
            for index in messageIn.data:
                for ship_indexes_to_guess, guessed in self.player_game.ships_to_guess.items():
                    if index in ship_indexes_to_guess:
                        print(f'index:{index} odgagniety w {ship_indexes_to_guess}')
                        guessed.add(index)
                        counter_guessed = 1  
                        
                        #sprawdz czy caly statek zatopiony
                        if tuple(guessed) == ship_indexes_to_guess:
                            print(f'zatopiony zaly statek {guessed}')
                            counter_sunken_ship = 1
                            for id in guessed:
                                self.player_game.opponent_board.set_item_state(id, SquareItemState.SUNKEN_SHIP)
                                self.session_game_players\
                                    .get_opponent_game(self.player_game.player_id)\
                                    .my_board.set_item_state(id, SquareItemState.SUNKEN_SHIP)
                        else:
                            self.player_game.opponent_board.set_item_state(index, SquareItemState.HIT)
                            self.session_game_players\
                                .get_opponent_game(self.player_game.player_id)\
                                .my_board.set_item_state(index, SquareItemState.HIT)
                    

            # TODO
            ## strzelil pole i kontynuje
            if counter_guessed == 1 and counter_sunken_ship == 0:
                ##zostaw sb state shooting
                await self.ping_opponent_new_state(MessageOutType.OPPONENT_ROUND)
            ## zatopiony statek
            elif counter_guessed == 1 and counter_sunken_ship == 1:
                self.player_game.game_state = PlayerGameState.OPPONENT_ROUND
                self.session_game_players.get_opponent_game(self.player_game.player_id).game_state = PlayerGameState.SHOOTING
                await self.ping_opponent_new_state(MessageOutType.SHOOTING)
            elif counter_guessed == 0 and counter_sunken_ship == 0:
                print(f'index:{index} nietrafiony')
                self.player_game.opponent_board.set_item_state(index, SquareItemState.MISHIT)
                self.session_game_players\
                    .get_opponent_game(self.player_game.player_id)\
                    .my_board.set_item_state(index, SquareItemState.MISHIT)
                self.player_game.game_state = PlayerGameState.OPPONENT_ROUND
                self.session_game_players.get_opponent_game(self.player_game.player_id).game_state = PlayerGameState.SHOOTING
                await self.ping_opponent_new_state(MessageOutType.SHOOTING)
            else:
                print('ERROR')
        else:
            print('ignore message')

    async def handler_end_setting_ships(self):
        print('handler_end_setting_ships')
        # wszystkie statki zaznaczone
        if self.player_game.game_state == PlayerGameState.END_SETTING_SHIPS: #ustawione w metodzie handler_start_or_setting_ships
            print('wszystkie statki')
            #przeciwnik juz mial ustawione wszystkie statki
            if self.session_game_players.get_opponent_game(self.player_game.player_id).game_state == PlayerGameState.WAIT_FOR_OPPONENT_END_SETTING_SHIPS:
                #ustaw sobie ze tura przeciwnika
                print(f'{self.player_game.player_id}: tura przeciwnika ')
                self.player_game.game_state = PlayerGameState.OPPONENT_ROUND
                #ustaw przeciwnikowi stan gry strzelanie
                self.session_game_players.get_opponent_game(self.player_game.player_id).game_state = PlayerGameState.SHOOTING
                await self.ping_opponent_new_state(MessageOutType.SHOOTING)
            #przeciwnik nie ma ustawionych wszystkich statkow
            else:
                #ustaw ze ma wszystkie ustawione
                print(f'{self.player_game.player_id}: masz wszystkei ustawione czekaj na prczeiwnka')
                self.player_game.game_state = PlayerGameState.WAIT_FOR_OPPONENT_END_SETTING_SHIPS
        else:
            pass

    async def send_res_or_ping_opponent(self, messageIn: WebSocketMessageIn) -> None:
        print('send_res_or_ping_opponent')
        result: WebSocketMessageOut = None
        if self.player_game.game_state in (PlayerGameState.START, PlayerGameState.SETTING_SHIPS):
            await  self.send_res_in_setting_ship(messageIn)
        elif self.player_game.game_state == PlayerGameState.WAIT_FOR_OPPONENT_END_SETTING_SHIPS:
            await self.send_res_in_wait_for_opponent_end_setting_ships(messageIn)
        elif self.player_game.game_state == PlayerGameState.OPPONENT_ROUND:
            await self.send_res_in_opponent_round(messageIn)
        elif self.player_game.game_state == PlayerGameState.SHOOTING:
            await self.send_res_in_shooting(messageIn)
        else:
            print(f'!!!!!!!!!! get res in other state: {self.player_game.game_state}')
        return result

    async def handler_message(self, messageIn: WebSocketMessageIn) -> None:
        print('handler_message')
        if self.player_game.game_state in (PlayerGameState.START, PlayerGameState.SETTING_SHIPS):
            data = self.player_game.handler_start_or_setting_ships(messageIn=messageIn)
            if data != {}:
                await self.set_opponenet_ships_to_guess(data=data)
            await self.handler_end_setting_ships()
        elif self.player_game.game_state == PlayerGameState.SHOOTING:
            await self.handler_shooting(messageIn=messageIn)
        else:
            print(f'!!!!!!!handler message in other state:{self.player_game.game_state}; clinet_id: {self.player_game.player_id}')
            
            