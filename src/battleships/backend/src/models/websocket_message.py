from pydantic import BaseModel

class WebSocketMessageIn(BaseModel):
    id: str
    type: str
    data: list

class WebSocketMessageOut(BaseModel):
    id: str
    id_server_res: str
    type: str
    source: str
    data: list
    

