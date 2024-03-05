# course.py
from sqlalchemy import ForeignKey, SmallInteger, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column, relationship

from src.models.base import Base


class Course(Base):
    __tablename__ = "course"

    name = mapped_column(String, nullable=False)
    number = mapped_column(SmallInteger)
    fk_dependency = mapped_column(UUID, ForeignKey("dependency.id"), nullable=False)

    academic_periods = relationship(
        "AcademicPeriod", back_populates="courses", secondary="academic_period_course"
    )
    dependency = relationship("Dependency", back_populates="courses")

    def __str__(self):
        return f"{self.name} - {self.number}"

    def __repr__(self):
        return f"{self.name} - {self.number}"
