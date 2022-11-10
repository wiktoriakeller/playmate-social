from ..ships.constants import *
from ..ships.helper_methods import *
from typing import Dict, List, Tuple
class Board():
    _matrix_keys = sorted([i*11 + j for j in range(1,11) for i in range(1,11)])
    @property
    def matrix_keys(self):
        return self._matrix_keys

    def __init__(self) -> None:
        self.matrix: dict[int, SquareItemState] = {index: SquareItemState.BLANK for index in self.matrix_keys} 
        self.ships_indexes_on_board = []

    def set_item_state(self, index: int, new_state: SquareItemState) -> None:
        if index not in self.matrix.keys():
            raise Exception(f"Index error: index {index} is not in matrix_keys")
        else:
            self.matrix[index] = new_state
            
    def get_item_state(self, index: int) -> SquareItemState:
        if index not in self.matrix.keys():
            raise Exception(f"Index error: index {index} is not in matrix_keys")
        else:
            return self.matrix[index]

    def get_matrix(self) -> Dict[int, SquareItemState]:
        return self.matrix

    @classmethod
    def get_neighbours(cls, index: int) -> List[int]:
        return cls.get_neighbours_corners(index) + cls.get_neighbours_cross(index)
    
    @staticmethod
    def get_neighbours_cross(index: int) -> List[int]:
        n = []
        n.append(index-1) if (index-1)%11 != 0 else None #lewy
        n.append(index-11) if (index-11) >= 12 else None #gora
        n.append(index+1) if (index+1)%11 != 0 else None #prawy
        n.append(index+11) if (index+11) <= 120 else None #dol
        return n

    @staticmethod
    def get_neighbours_corners(index: int) -> List[int]:
        n = []
        n.append(index-12) if (index-1)%11 != 0 and (index-12) >= 12 else None #lewy gora
        n.append(index-10) if (index-10)%11 != 0 and (index-10) >= 13 else None #prawy gora
        n.append(index+12) if (index+12)%11 != 0  and (index+12) <= 120 else None #prawy dol
        n.append(index+10) if (index+10)%11 != 0 and (index+10) <=119  else None #dol lewy
        return n
    
    def count_set_ship_neighbours(self, index):
        neighbours = self.get_neighbours(index)
        count = 0
        for neigh in neighbours:
            if SquareItemState(self.get_item_state(neigh)) == SquareItemState.SET_SHIP:
                count += 1
        if count > 2:
            print(f"index: {index} has count: {count}")
        return count

    def count_set_ship_corners(self, index):
        corners = self.get_neighbours_corners(index)
        count = 0
        for corner in corners:
            if SquareItemState(self.get_item_state(corner)) == SquareItemState.SET_SHIP:
                count += 1
        if count > 0:
            print(f"index: {index} has count: {count} in corners")
        return count
    
    def count_set_ship_cross(self, index):
        cross = self.get_neighbours_cross(index)
        count = 0
        for c in cross:
            if SquareItemState(self.get_item_state(c)) == SquareItemState.SET_SHIP:
                count += 1
        if count > 0:
            print(f"index: {index} has count: {count} in cross")
        return count

    def check_set_ship_neighbours(self, index) -> bool:
        item_index_state = self.get_item_state(index)
        self.set_item_state(index, SquareItemState.SET_SHIP)
        flag = True
        for (k,v) in list(self.get_matrix().items()):
            if SquareItemState(self.get_item_state(k)) == SquareItemState.SET_SHIP:
                if self.count_set_ship_neighbours(k) > 2:
                    flag=False
                    break
        # check corners
        if self.count_set_ship_corners(index) > 0:
            flag=False
        self.set_item_state(index, item_index_state)
        return flag
    


class MyBoard(Board):
    def __init__(self) -> None:
        super().__init__()
        self.fleet = {}
        self.fleet_indexes: Dict[tuple, set] = {}
        self.next_ship_length_to_set = max(SHIPS_FLEET.keys())
        self.h_allowed_places = {}
        self.v_allowed_places = {}

    def set_next_ship_length(self) -> None:
        print('set_next_ship_length')
        sorted_param_fleet = sorted(SHIPS_FLEET.items(), key=operator.itemgetter(0), reverse=True)        
        counted_length = 0 # jezeli juz sa wszystkie to zwroc len=0
        for (k, v) in sorted_param_fleet:
            if v > self.fleet.get(k, 0):
                counted_length = k
                break
        self.next_ship_length_to_set = counted_length

    def set_allowed_places(self) -> None:
        print('set_allowed_places')
        self.h_allowed_places = {i:(1 if self.verify_ship_to_allowed_places(index=i, length=self.next_ship_length_to_set, orientation=Orientation.HORIZONTAL) else 0) for i in self.matrix_keys }
        self.v_allowed_places = {i:(1 if self.verify_ship_to_allowed_places(index=i, length=self.next_ship_length_to_set, orientation=Orientation.VERTICAL) else 0) for i in self.matrix_keys }

        print(self.h_allowed_places)
    def verify_ship_to_allowed_places(self, index, length, orientation: Orientation) -> bool:
        flag = True
        if orientation == Orientation.HORIZONTAL:
            for i in range(length):
                checked_index = index + i
                if checked_index not in self.matrix_keys:
                    flag = False
                    break
                if self.count_set_ship_neighbours(checked_index) > 0:
                    flag = False
                    break
        elif orientation == Orientation.VERTICAL:
            for i in range(length):
                checked_index = index + i*11
                if checked_index not in self.matrix_keys:
                    flag = False
                    break
                if self.count_set_ship_neighbours(checked_index) > 0:
                    flag = False
                    break
        else:
            print('ERROR')
        return flag


class OpponentBoard(Board):
    def __init__(self) -> None:
        super().__init__()