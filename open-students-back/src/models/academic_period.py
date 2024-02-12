# academic_period.py
from sqlalchemy import Column, Date, String
from src.models.base import Base


class AcademicPeriod(Base):
    __tablename__ = "academic_period"

    name = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
