from pydantic import BaseModel

class CreateGameRequest(BaseModel):
    version: str
    type: str
    token: str
    usr_id_sender: str
    usr_id_receiver: str
    name_sender: str
    name_receiver: str

class CreateGameResponse(BaseModel):
    version: str
    type: str
    game_url_link_sender: str
    game_url_link_receiver: str
    usr_id_sender: str
    usr_id_receiver: str
    name_sender: str
    name_receiver: str
    session_id: str
    
