# review.py
from sqlalchemy import Boolean, ForeignKey, Numeric, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column, relationship

from src.models.base import Base


class Review(Base):
    __tablename__ = "review"

    review = mapped_column(String, nullable=False)
    general_rating = mapped_column(Numeric, nullable=False)
    difficulty_level = mapped_column(Numeric, nullable=False)
    course_grade = mapped_column(Numeric, nullable=False)
    would_enroll_again = mapped_column(Boolean, nullable=False)
    fk_professor = mapped_column(UUID, ForeignKey("professor.id"), nullable=False)
    fk_course = mapped_column(UUID, ForeignKey("course.id"), nullable=False)
    fk_academic_period = mapped_column(
        UUID, ForeignKey("academic_period.id"), nullable=False
    )
    fk_creator = mapped_column(UUID, ForeignKey("student.id"), nullable=False)

    creator = relationship("Student", back_populates="reviews")
    professor = relationship("Professor", back_populates="reviews")
    course = relationship("Course", cascade="all, delete")
    academic_period = relationship("AcademicPeriod")

    def __str__(self):
        return self.review[:50]

    def __repr__(self):
        return self.review[:50]
