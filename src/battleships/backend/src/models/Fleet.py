from ..ships.constants import SHIPS_FLEET, SquareItemState
from typing import Dict, List, Tuple
class Fleet():
    _ship_counter = sum(SHIPS_FLEET.values())
    @property
    def ship_counter(self):
        return self._ship_counter

    def __init__(self) -> None:
        self.ships:List[FleetShip] = [FleetShip() for i in range(self.ship_counter)]

class FleetShip():
    def __init__(self) -> None:
        self.length = 0
        self.indexes = []
