from typing import Dict
from dataclasses import dataclass
from .ships.constants import *
from .models.player_game import PlayerGame


class Players():
    def __init__(self, usr_id_sender: str, usr_id_receiver: str) -> None:
        self.usr_id_sender = usr_id_sender
        self.usr_id_receiver = usr_id_receiver 
    def __repr__(self):
        return f"sender: {self.usr_id_sender}, receiver: {self.usr_id_receiver}"




@dataclass
class SessionGamePlayers:
    players: Players
    sessionGameState: SessionGameState
    playerGame1: PlayerGame
    playerGame2: PlayerGame

    def get_player_game(self, player_id) -> PlayerGame:

        if player_id == self.players.usr_id_sender:
            '''Player_id is sender that is player1'''
            return self.playerGame1
        else:
            '''Player_id is receiver that is player2'''
            return self.playerGame2
    
    def get_opponent_game(self, player_id) -> PlayerGame:
        if player_id == self.players.usr_id_sender:
            return self.playerGame2
        else:
            return self.playerGame1
        
    def set_state_opponent_player_game(self, player_id, state: bool) -> None:
        if player_id == self.players.usr_id_sender:
            self.playerGame2.opponent_connected = state
        else:
            self.playerGame1.opponent_connected = state

game_session_register:Dict[str, SessionGamePlayers] = {
    "game_session_0": SessionGamePlayers(
        players=Players("user0", "user1"),
        sessionGameState=SessionGameState.CREATED,
        playerGame1=PlayerGame(player_id="user0", player_name="Ferdek0", opponent_id="user1", opponent_name="Ferdek1"),
        playerGame2=PlayerGame(player_id="user1", player_name="Ferdek1", opponent_id="user0", opponent_name="Ferdek0")
    )
}

