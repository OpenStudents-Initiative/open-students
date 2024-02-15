# review.py
from sqlalchemy import Boolean, Column, Numeric, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import Base


class Review(Base):
    __tablename__ = "review"

    review = Column(String, nullable=False)
    general_rating = Column(Numeric, nullable=False)
    difficulty_level = Column(Numeric, nullable=False)
    course_grade = Column(Numeric, nullable=False)
    would_enroll_again = Column(Boolean, nullable=False)
    fk_professor = Column(UUID, ForeignKey("professor.id"), nullable=False)
    fk_course = Column(UUID, ForeignKey("course.id"), nullable=False)
    fk_academic_period = Column(UUID, ForeignKey("academic_period.id"), nullable=False)
    creator = Column(UUID, nullable=False)
