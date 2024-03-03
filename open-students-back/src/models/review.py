# review.py
from sqlalchemy import Boolean, Column, Numeric, String, ForeignKey
from sqlalchemy.orm import relationship
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
    fk_creator = Column(UUID, ForeignKey("student.id"), nullable=False)

    creator = relationship("Student", back_populates="reviews")
    professor = relationship("Professor", back_populates="reviews")
    course = relationship("Course", cascade="all, delete")
    academic_period = relationship("AcademicPeriod")

    def __str__(self):
        return self.review[:50]

    def __repr__(self):
        return self.review[:50]
