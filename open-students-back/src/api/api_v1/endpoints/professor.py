from fastapi import APIRouter, Depends
from src.schemas.professor import Professor
from src.schemas.review import Review
from src.schemas.course import Course
from src.services.professor import professor_service
from sqlalchemy.orm import Session
from src.config.db_config import get_db
from uuid import UUID

router = APIRouter()


@router.get("/")
async def read_professors(db: Session = Depends(get_db), keys: str = None):
    return professor_service.get_all(db=db, keys=keys)


@router.get("/{professor_id}", response_model=Professor)
async def read_professor(professor_id: UUID, db: Session = Depends(get_db)):
    return professor_service.get(db=db, id=professor_id)


@router.get("/{professor_id}/reviews", response_model=list[Review])
async def read_professor_reviews(professor_id: UUID, db: Session = Depends(get_db)):
    return professor_service.get_professor_reviews(db=db, id=professor_id)


@router.get("/{professor_id}/courses", response_model=list[Course])
async def read_professor_courses(professor_id: UUID, db: Session = Depends(get_db)):
    return professor_service.get_professor_courses(db=db, id=professor_id)
