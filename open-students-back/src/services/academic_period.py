from sqlalchemy.orm import Session
from src.services.crud.base import CRUDBase
from src.schemas.academic_period import AcademicPeriodCreate, AcademicPeriodUpdate
from src.models.academic_period import AcademicPeriod


class CRUDAcademicPeriod(
    CRUDBase[AcademicPeriod, AcademicPeriodCreate, AcademicPeriodUpdate]
):
    pass


academic_period_service = CRUDAcademicPeriod(AcademicPeriod)
