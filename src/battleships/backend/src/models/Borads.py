from ..ships.constants import *
class Borad():
    _matrix_keys = sorted([i*11 + j for j in range(1,11) for i in range(1,11)])
    @property
    def matrix_keys(self):
        return self._matrix_keys

    def __init__(self) -> None:
        self.matrix: dict[int, SquareItemState] = {index: SquareItemState.BLANK for index in self.matrix_keys} 

class MyBoard(Borad):
    def __init__(self) -> None:
        super().__init__()

class OpponentBoard(Borad):
    def __init__(self) -> None:
        super().__init__()