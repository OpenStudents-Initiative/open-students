from fastapi import APIRouter, Depends
from src.schemas.student import Student
from src.services.student import student_service
from sqlalchemy.orm import Session
from src.config.db_config import get_db

router = APIRouter()


@router.get("/")
async def login_student(
    db: Session = Depends(get_db), email: str = None, password: str = None
):
    return student_service.login(db=db, email=email, password=password)
