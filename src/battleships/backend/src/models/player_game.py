from ..ships.constants import *
from .Boards import *
from .websocket_message import WebSocketMessageIn, WebSocketMessageOut, ResponseData

import uuid
class PlayerGame():
    def __init__(self, player_id: str, opponent_id: str) -> None:
        self.player_id = player_id
        self.opponent_id = opponent_id
        self.opponent_connected = False
        self.game_state: PlayerGameState = PlayerGameState.START
        self.my_board = MyBoard()
        self.opponent_board = OpponentBoard()

    

    def handler_start_or_setting_ships(self, messageIn: WebSocketMessageIn) -> None:
        print(f"messageIn.type: {messageIn.type}")
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
                
        else:
            print('ignore message')
    
    def __verification_setting_item_to_ship(self, index: int) -> bool:
        if self.my_board.check_set_ship_neighbours(index) == False:
            print('zly statek: sasiedzi')
            return False
        if self.my_board.check_set_ship_fleet_descending(index) == False:
            print('zly statek: kolejnosc')
            return False
        return True