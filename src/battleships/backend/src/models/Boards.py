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
        self.h_allowed_places = []
        self.v_allowed_places = []

    def set_next_ship_length(self) -> None:
        print('set_next_ship_length')
        sorted_param_fleet = sorted(SHIPS_FLEET.items(), key=operator.itemgetter(0), reverse=True)        
        counted_length = 0 # jezeli juz sa wszystkie to zwroc len=0
        for (k, v) in sorted_param_fleet:
            if v > self.fleet.get(k, 0):
                print(f'nie masz wystarczajco duzo statkwo {k}-masztowcyh')
                counted_length = k
                break
        self.next_ship_length_to_set = counted_length

    def set_allowed_places(self) -> None:
        print('set_allowed_places')
        self.h_allowed_places = [i for i in self.matrix_keys if self.verify_ship_to_allowed_places(index=i, length=self.next_ship_length_to_set, orientation=Orientation.HORIZONTAL)]
        self.v_allowed_places = [i for i in self.matrix_keys if self.verify_ship_to_allowed_places(index=i, length=self.next_ship_length_to_set, orientation=Orientation.VERTICAL)]

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

    
    def detect_ship_horizontally(self) -> List[int]:
        def gen_line(row):
            count, ship_indexes = 0, []
            for j in range(1,11):
                if SquareItemState(self.get_item_state(row*11+j)) == SquareItemState.SET_SHIP:
                    count += 1
                    ship_indexes.append(row*11+j)
                # print(f'id:{row*11+j} j:{j} count:{count}')
                if (SquareItemState(self.get_item_state(row*11+j)) != SquareItemState.SET_SHIP and count != 0) \
                    or (j == 10 and  count != 0):
                    detected_ship, detected_ship_indexes = count, ship_indexes
                    count, ship_indexes = 0, []
                    if detected_ship > 1:
                        yield (detected_ship, detected_ship_indexes)
                    # jednomasztowiec
                    else:
                        #print(f'jednomasztoweic {row*11 + j - 1};;{self.count_set_ship_cross(row*11 + j - 1)}')
                        if j < 10 or (j==10 and SquareItemState(self.get_item_state(row*11+j)) != SquareItemState.SET_SHIP):
                            if self.count_set_ship_cross(row*11 + j - 1) == 0:
                                yield (detected_ship, detected_ship_indexes)
                        else:
                            if self.count_set_ship_cross(row*11 + j) == 0:
                                yield (detected_ship, detected_ship_indexes)
        ships = []
        ships_indexes = []
        for i in range(1,11):
            for (detected_ship, detected_ship_indexes) in gen_line(i):
                ships.append(detected_ship) 
                ships_indexes.append(detected_ship_indexes) 
 
        #print(f'horizontal {ships}')       
        return (ships, ships_indexes)

    def detect_ship_vertically(self) -> List[int]:
        def gen_line(col):
            count, ship_indexes = 0, []
            for i in range(1,11):
                if SquareItemState(self.get_item_state(i*11+col)) == SquareItemState.SET_SHIP:
                    count += 1
                    ship_indexes.append(i*11+col)

                if (count != 0  and SquareItemState(self.get_item_state(i*11+col)) != SquareItemState.SET_SHIP) \
                    or (i == 10 and count != 0):
                    detected_ship, detected_ship_indexes = count, ship_indexes
                    count, ship_indexes = 0, []
                    if detected_ship > 1:
                        yield (detected_ship, detected_ship_indexes)

        ships = []
        ships_indexes = []
        for j in range(1,11):
            for (detected_ship, detected_ship_indexes) in gen_line(j):
                ships.append(detected_ship) 
                ships_indexes.append(detected_ship_indexes) 
        #print(f'vertival {ships}')      
        return (ships, ships_indexes)

    def detect_ship(self):
        self.fleet = {}
        self.ships_indexes_on_board = []
        h_ship_count, h_ship_indexes = self.detect_ship_horizontally()
        v_ship_count, v_ship_indexes = self.detect_ship_vertically()
        print(f'ship counters: {h_ship_count + v_ship_count}')
        print(f'ship indexes: {h_ship_indexes + v_ship_indexes}')

        for ship_len in h_ship_count + v_ship_count:
            self.fleet[ship_len] = self.fleet.get(ship_len, 0) + 1
        for ship_indexes in h_ship_indexes + v_ship_indexes:
            self.ships_indexes_on_board.append(sorted(ship_indexes))
        print(f'detected_ship: {self.fleet}')
        print(f'detected indexes: {self.ships_indexes_on_board}')
    
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