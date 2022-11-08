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

    

    def handler_start_or_setting_ships(self, messageIn: WebSocketMessageIn) -> Dict:
        print(f"messageIn.type: {messageIn.type}")
        data = {}
        if MessageInType[messageIn.type] == MessageInType.BLANK_SQUARE_TO_SET:
            '''Dodaj ustawiony statek na swojej planszy'''
            print(f"messageIn.data: {messageIn.data}")
            for index in messageIn.data:
                if self.__verification_setting_item_to_ship(index):
                    print('dobry statek')
                    self.my_board.set_item_state(index, SquareItemState.SET_SHIP)
                else:
                    print('zly statek')
            
            # TODO
            if self.my_board.check_all_fleet_setting() == True:
                print('usatwe end_setting_ships')
                self.game_state = PlayerGameState.END_SETTING_SHIPS
                
                for ship_indexes in self.my_board.ships_indexes_on_board:
                    data[tuple(sorted(ship_indexes))] = set()
                
                
        else:
            print('ignore message')
        return data

    
    def __verification_setting_item_to_ship(self, index: int) -> bool:
        if self.my_board.check_set_ship_neighbours(index) == False:
            print('zly statek: sasiedzi')
            return False
        if self.my_board.check_set_ship_fleet_descending(index) == False:
            print('zly statek: kolejnosc')
            return False
        return True