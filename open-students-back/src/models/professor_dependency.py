# professor_dependency.py
from sqlalchemy import Column, ForeignKey

from sqlalchemy.dialects.postgresql import UUID
from src.models.base import Base


class ProfessorDependency(Base):
    __tablename__ = "professor_dependency"

    fk_professor = Column(
        UUID, ForeignKey("professor.id"), nullable=False, primary_key=True
    )
    fk_dependency = Column(
        UUID, ForeignKey("dependency.id"), nullable=False, primary_key=True
    )
