# academic_period_course.py
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column

from src.models.base import Base


class AcademicPeriodCourse(Base):
    __tablename__ = "academic_period_course"

    fk_academic_period = mapped_column(
        UUID, ForeignKey("academic_period.id"), nullable=False
    )
    fk_course = mapped_column(UUID, ForeignKey("course.id"), nullable=False)
