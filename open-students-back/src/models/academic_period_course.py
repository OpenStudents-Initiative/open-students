# academic_period_course.py
from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import Base


class AcademicPeriodCourse(Base):
    __tablename__ = "academic_period_course"

    fk_academic_period = Column(UUID, ForeignKey("academic_period.id"), nullable=False)
    fk_course = Column(UUID, ForeignKey("course.id"), nullable=False)
