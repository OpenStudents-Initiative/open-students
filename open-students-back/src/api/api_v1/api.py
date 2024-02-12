from fastapi import APIRouter

from src.api.api_v1.endpoints import (
    # academic_period,
    # course,
    # dependency,
    # professor,
    # review,
    university,
    # academic_period_course,
    # professor_dependency,
)

api_router = APIRouter()
api_router.include_router(university.router, prefix="/university", tags=["university"])
