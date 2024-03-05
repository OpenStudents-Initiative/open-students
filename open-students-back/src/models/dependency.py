# dependency.py
from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column, relationship

from src.models.base import Base


class Dependency(Base):
    __tablename__ = "dependency"

    name = mapped_column(String, nullable=False)
    abbreviation = mapped_column(String)
    fk_university = mapped_column(UUID, ForeignKey("university.id"), nullable=False)

    university = relationship("University")
    professors = relationship(
        "Professor", back_populates="dependencies", secondary="professor_dependency"
    )
    courses = relationship("Course", back_populates="dependency")

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
