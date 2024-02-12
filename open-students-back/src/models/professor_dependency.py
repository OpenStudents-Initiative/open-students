# professor_dependency.py
from sqlalchemy import Column, TIMESTAMP, text
from sqlalchemy.dialects.postgresql import UUID
from ..config.db_config import Base

class ProfessorDependency(Base):
    __tablename__ = 'professor_dependency'
    __table_args__ = {'schema': 'public'}

    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text("now()"))
    fk_professor = Column(UUID, nullable=False)
    fk_dependency = Column(UUID, nullable=False)
