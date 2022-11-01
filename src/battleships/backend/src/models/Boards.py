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
        

    def detect_ship_horizontally(self) -> List[int]:
        def gen_line(row):
            count = 0
            for j in range(1,11):
                if SquareItemState(self.get_item_state(row*11+j)) == SquareItemState.SET_SHIP:
                    count += 1
                # print(f'id:{row*11+j} j:{j} count:{count}')
                if (SquareItemState(self.get_item_state(row*11+j)) != SquareItemState.SET_SHIP and count != 0) \
                    or (j == 10 and  count != 0):
                    detected_ship = count
                    count = 0
                    if detected_ship > 1:
                        yield detected_ship
                    # jednomasztowiec
                    else:
                        #print(f'jednomasztoweic {row*11 + j - 1};;{self.count_set_ship_cross(row*11 + j - 1)}')
                        if j < 10:
                            if self.count_set_ship_cross(row*11 + j - 1) == 0:
                                yield detected_ship
                        else:
                            if self.count_set_ship_cross(row*11 + j) == 0:
                                yield detected_ship
        ships = []
        for i in range(1,11):
            for detected_ship in gen_line(i):
                ships.append(detected_ship) 
        #print(f'horizontal {ships}')       
        return ships
    def detect_ship_vertically(self) -> List[int]:
        def gen_line(col):
            count = 0
            for i in range(1,11):
                if SquareItemState(self.get_item_state(i*11+col)) == SquareItemState.SET_SHIP:
                    count += 1

                if (count != 0  and SquareItemState(self.get_item_state(i*11+col)) != SquareItemState.SET_SHIP) \
                    or (i == 10 and count != 0):
                    detected_ship = count
                    count = 0
                    if detected_ship > 1:
                        yield detected_ship

        ships = []
        for j in range(1,11):
            for detected_ship in gen_line(j):
                ships.append(detected_ship)  
        #print(f'vertival {ships}')      
        return ships
    def detect_ship(self):
        self.fleet = {}
        for ship_len in self.detect_ship_horizontally() + self.detect_ship_vertically():
            self.fleet[ship_len] = self.fleet.get(ship_len, 0) + 1
        print(f'detected_ship: {self.fleet}')
    
    def check_set_ship_fleet_descending(self, index) -> bool:
        print('check order')
        item_index_state = self.get_item_state(index)
        self.set_item_state(index, SquareItemState.SET_SHIP)
        self.detect_ship()
        flag = check_fleet_setting_descending_order(self.fleet, SHIPS_FLEET)
        self.set_item_state(index, item_index_state)
        return flag

    def check_all_fleet_setting(self) -> bool:
        self.detect_ship()
        print(self.fleet, SHIPS_FLEET)
        flag = compare_fleet(self.fleet, SHIPS_FLEET)
        return flag

class OpponentBoard(Board):
    def __init__(self) -> None:
        super().__init__()