from typing import Any
from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.config.db_config import get_db
from src.schemas.course import Course
from src.schemas.professor import Professor
from src.schemas.review import Review
from src.services.professor import Dict, List, professor_service

router = APIRouter()


@router.get("/", response_model=List[Professor] | List[Dict[str, Any]])
async def read_professors(db: Session = Depends(get_db), keys: str = ""):
    if keys:
        return professor_service.get_all_with_keys(db=db, keys=keys)
    return professor_service.get_all(db)


@router.get("/{professor_id}", response_model=Professor)
async def read_professor(professor_id: UUID, db: Session = Depends(get_db)):
    return professor_service.get(db=db, id=professor_id)


@router.get("/{professor_id}/reviews", response_model=list[Review])
async def read_professor_reviews(professor_id: UUID, db: Session = Depends(get_db)):
    return professor_service.get_professor_reviews(db=db, id=professor_id)


@router.get("/{professor_id}/courses", response_model=list[Course])
async def read_professor_courses(professor_id: UUID, db: Session = Depends(get_db)):
    return professor_service.get_professor_courses(db=db, id=professor_id)
