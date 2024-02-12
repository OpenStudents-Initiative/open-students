# academic_period.py
from sqlalchemy import Column, Date, String, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from ..config.db_config import Base

class AcademicPeriod(Base):
    __tablename__ = 'academic_period'
    __table_args__ = {'schema': 'public'}

    id = Column(UUID, primary_key=True, server_default=text("gen_random_uuid()"))
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    name = Column(String, nullable=False)
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
