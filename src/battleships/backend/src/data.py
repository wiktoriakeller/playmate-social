import re
from typing import Dict, TypedDict
from dataclasses import dataclass

class Players():
    def __init__(self, usr_id_sender: str, usr_id_receiver: str) -> None:
        self.usr_id_sender = usr_id_sender
        self.usr_id_receiver = usr_id_receiver 
    def __repr__(self):
        return f"sender: {self.usr_id_sender}, receiver: {self.usr_id_receiver}"

@dataclass
class SessionGamePlayers:
    players: Players
    


game_session_register:Dict[str, SessionGamePlayers] = {
    "game_session_0": SessionGamePlayers(players=Players("user0", "user1"))
}
