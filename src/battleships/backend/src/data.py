from dataclasses import dataclass

@dataclass
class SessionGamePlayers:
    usr_id_sender: str
    usr_id_receiver: str


game_session_register:dict[str, SessionGamePlayers] = {}
