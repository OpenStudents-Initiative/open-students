from fastapi import APIRouter

from src.api.api_v1.endpoints import (
    academic_period,
    professor,
    login,
    # review, TODO: Implement review creation
    university,
    root,
)

api_router = APIRouter()

api_router.include_router(root.router, tags=["Health check"])
api_router.include_router(
    university.router, prefix="/universities", tags=["university"]
)
api_router.include_router(professor.router, prefix="/professors", tags=["professor"])
api_router.include_router(
    academic_period.router, prefix="/periods", tags=["academic_period"]
)
api_router.include_router(login.router, prefix="/login", tags=["login"])
