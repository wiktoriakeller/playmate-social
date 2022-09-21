from pydantic import BaseModel

class WebSocketMessageIn(BaseModel):
    type: str
    data: list

class WebSocketMessageOut(BaseModel):
    type: str
    source: str
    data: list
    

