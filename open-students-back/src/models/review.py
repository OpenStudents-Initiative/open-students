# review.py
from sqlalchemy import Boolean, Column, Numeric, String, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from ..config.db_config import Base

class Review(Base):
    __tablename__ = 'review'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("gen_random_uuid()"))
    created_at = Column(TIMESTAMP(timezone=True), nullable=False)
    review = Column(String, nullable=False)
    general_rating = Column(Numeric, nullable=False)
    difficulty_level = Column(Numeric, nullable=False)
    course_grade = Column(Numeric, nullable=False)
    would_enroll_again = Column(Boolean, nullable=False)
    fk_professor = Column(UUID, nullable=False)
    fk_course = Column(UUID, nullable=False)
    fk_academic_period = Column(UUID, nullable=False)
    creator = Column(UUID, nullable=False)