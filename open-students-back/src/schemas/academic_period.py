from pydantic import BaseModel, UUID4
from datetime import date


class AcademicPeriodBase(BaseModel):
    pass


class AcademicPeriod(AcademicPeriodBase):
    id: UUID4
    name: str

    class Config:
        orm_mode = True


class AcademicPeriodCreate(AcademicPeriodBase):
    name: str
    start_date: date
    end_date: date


class AcademicPeriodUpdate(AcademicPeriodBase):
    name: str | None = None
    start_date: date | None = None
    end_date: date | None = None
