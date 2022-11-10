from ..data import game_session_register, SessionGamePlayers, Players
from constants import PlayerGameState

class GameSessionManager:
    def __init__(self):
        self.active_connections: Dict[str, WebSocket] = {}
