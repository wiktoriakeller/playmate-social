from pydantic import BaseModel

class WebSocketMessageIn(BaseModel):
    type: str
    data: list
    

