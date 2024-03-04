# course.py
from sqlalchemy import Column, SmallInteger, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import Base


class Course(Base):
    __tablename__ = "course"

    name = Column(String, nullable=False)
    number = Column(SmallInteger)
    fk_dependency = Column(UUID, ForeignKey("dependency.id"), nullable=False)

    academic_periods = relationship(
        "AcademicPeriod", back_populates="courses", secondary="academic_period_course"
    )
    dependency = relationship("Dependency", back_populates="courses")

    def __str__(self):
        return f"{self.name} - {self.number}"

    def __repr__(self):
        return f"{self.name} - {self.number}"
