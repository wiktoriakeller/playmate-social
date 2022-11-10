from ..ships.constants import *
from .Boards import *
from .websocket_message import WebSocketMessageIn

import uuid
class PlayerGame():
    def __init__(self, player_id: str, player_name:str, opponent_id: str, opponent_name: str) -> None:
        self.player_id = player_id
        self.player_name = player_name
        self.my_board_info: str = "Start setting"
        self.my_board_enabled: bool = True
        self.opponent_id = opponent_id
        self.opponent_name = opponent_name
        self.opponent_board_info: str = "Wait for shooting"
        self.opponent_board_enabled: bool = False
        self.opponent_connected: bool = False
        self.game_state: PlayerGameState = PlayerGameState.START
        self.my_board = MyBoard()
        self.opponent_board = OpponentBoard()
        self.ships_to_guess:Dict [tuple, set] = {}

    def set_boards_info(self, my_board_info: BoradInfo = None, opponent_board_info: BoradInfo = None) -> None:
        if my_board_info != None:
            self.my_board_info = my_board_info.value 
        if opponent_board_info != None:
            self.opponent_board_info = opponent_board_info.value


    def handler_start_or_setting_ships(self, messageIn: WebSocketMessageIn) -> None:
        print(f"messageIn.type: {messageIn.type}")
        if MessageInType[messageIn.type] == MessageInType.BLANK_SQUARE_TO_SET:
            '''Dodaj ustawiony statek na swojej planszy'''
            print(f"messageIn.data: {messageIn.data}")
            
            corner_index = min(messageIn.data)
            if (self.my_board.v_allowed_places.get(corner_index, 0) == 1 \
                or self.my_board.h_allowed_places.get(corner_index, 0) == 1) \
                or len(messageIn.data) == self.my_board.next_ship_length_to_set:
                print(f'DODAJE statek w miejscach: {messageIn.data}')
                for index in messageIn.data:
                    self.my_board.set_item_state(index, SquareItemState.SET_SHIP)
                #dodaj statek we flocie i indeksach 
                self.my_board.fleet[self.my_board.next_ship_length_to_set] = self.my_board.fleet.get(self.my_board.next_ship_length_to_set, 0) + 1
                self.my_board.fleet_indexes[tuple(sorted(messageIn.data))] = set()
                print(self.my_board.fleet_indexes)
                #oblicz nowa dlugosc statku
                self.my_board.set_next_ship_length()
                #oblicz nowe dozwolone miejsce
                self.my_board.set_allowed_places()
            else:
                print('ERROR proba dodania statku z niedozwolnego miejsca')
            
            # sprawdz czy juz wszystkie ustawione
            if self.my_board.next_ship_length_to_set == 0:
                print('ustaw end_setting_ships')
                self.game_state = PlayerGameState.END_SETTING_SHIPS
                self.my_board_enabled, self.opponent_board_enabled = False, True
                self.set_boards_info(BoradInfo.END_SETTING_SHIP, BoradInfo.WAIT_FOR_OPPONENT)
                                
        else:
            print('ignore message')