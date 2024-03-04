from fastapi import APIRouter, Depends

router = APIRouter()


@router.get("/")
async def ping():
    return "pong"
