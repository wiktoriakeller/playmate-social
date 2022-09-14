from sys import prefix
from urllib import response
import uuid
from fastapi import APIRouter, Depends, HTTPException

from ..models.create_game import CreateGameRequest, CreateGameResponse
from ..dependencies import *
from ..data import game_session_register, SessionGamePlayers
router = APIRouter(
    prefix="/battleships",
    tags=["games"]
)


@router.post("/session/create/", response_model=CreateGameResponse)
async def create_game_session(req: CreateGameRequest):
    session_id=str(uuid.uuid1())
    game_session_register[session_id] = SessionGamePlayers(req.usr_id_sender, req.usr_id_sender)
    print(f"register: {game_session_register}")
    return CreateGameResponse(
        **req.dict(), 
        session_id=session_id
    )

