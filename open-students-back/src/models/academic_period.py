# academic_period.py
from sqlalchemy import Date, String
from sqlalchemy.orm import mapped_column, relationship

from src.models.base import Base


class AcademicPeriod(Base):
    __tablename__ = "academic_period"

    name = mapped_column(String, nullable=False)
    start_date = mapped_column(Date, nullable=False)
    end_date = mapped_column(Date, nullable=False)

    courses = relationship(
        "Course", back_populates="academic_periods", secondary="academic_period_course"
    )

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
