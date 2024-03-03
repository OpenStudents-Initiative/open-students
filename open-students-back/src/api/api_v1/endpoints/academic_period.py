from fastapi import APIRouter, Depends
from src.schemas.academic_period import AcademicPeriod
from src.services.academic_period import academic_period_service
from sqlalchemy.orm import Session
from src.config.db_config import get_db

router = APIRouter()


@router.get("/", response_model=list[AcademicPeriod])
async def read_academic_period(db: Session = Depends(get_db)):
    return academic_period_service.get_all(db=db)
