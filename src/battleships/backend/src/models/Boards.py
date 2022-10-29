from ..ships.constants import *
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

    def get_matrix(self) -> Dict[int, SquareItemState]:
        return self.matrix

class MyBoard(Board):
    def __init__(self) -> None:
        super().__init__()

class OpponentBoard(Board):
    def __init__(self) -> None:
        super().__init__()