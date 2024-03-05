# professor_dependency.py
from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column

from src.models.base import Base


class ProfessorDependency(Base):
    __tablename__ = "professor_dependency"

    fk_professor = mapped_column(
        UUID, ForeignKey("professor.id"), nullable=False, primary_key=True
    )
    fk_dependency = mapped_column(
        UUID, ForeignKey("dependency.id"), nullable=False, primary_key=True
    )
