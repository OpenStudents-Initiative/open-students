# academic_period_course.py
from sqlalchemy import Column, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from ..config.db_config import Base

class AcademicPeriodCourse(Base):
    __tablename__ = 'academic_period_course'
    __table_args__ = {'schema': 'public'}

    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    fk_academic_period = Column(UUID, nullable=False)
    fk_course = Column(UUID, nullable=False)
