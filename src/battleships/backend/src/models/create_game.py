from pydantic import BaseModel

class CreateGameRequest(BaseModel):
    version: str
    type: str
    token: str
    usr_id_sender: str
    usr_id_receiver: str

class CreateGameResponse(BaseModel):
    version: str
    type: str
    token: str
    usr_id_sender: str
    usr_id_receiver: str
    session_id: str
    
