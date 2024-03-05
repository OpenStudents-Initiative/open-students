from src.models.academic_period import AcademicPeriod as AcademicPeriodModel
from src.schemas.academic_period import (
    AcademicPeriod,
    AcademicPeriodCreate,
    AcademicPeriodUpdate,
)
from src.services.crud.base import CRUDBase


class CRUDAcademicPeriod(
    CRUDBase[
        AcademicPeriodModel, AcademicPeriod, AcademicPeriodCreate, AcademicPeriodUpdate
    ]
):
    pass


academic_period_service = CRUDAcademicPeriod(AcademicPeriodModel, AcademicPeriod)
