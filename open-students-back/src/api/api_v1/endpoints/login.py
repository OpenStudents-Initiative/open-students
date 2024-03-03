from fastapi import APIRouter, Depends
from src.schemas.student import StudentCredentials, StudentLogin
from src.services.student import student_service
from sqlalchemy.orm import Session
from src.config.db_config import get_db

router = APIRouter()


@router.post("/", response_model=StudentLogin)
async def login(credentials: StudentCredentials, db: Session = Depends(get_db)):

    return student_service.login(
        db=db, email=credentials.username, password=credentials.password
    )
