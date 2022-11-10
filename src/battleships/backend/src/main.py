from typing import Union

from fastapi import FastAPI


from .routers import games
from .ships.data import game_session_register

app = FastAPI()


@app.get("/")
def read_root():
    return {"Hello": "World"}

app.include_router(
    games.router
)

@app.on_event("startup")
async def startup_event():
    print(f"register: {hex(id(game_session_register))}")