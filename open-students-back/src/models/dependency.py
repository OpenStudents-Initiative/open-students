# dependency.py
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from src.models.base import Base


class Dependency(Base):
    __tablename__ = "dependency"

    name = Column(String, nullable=False)
    abbreviation = Column(String)
    fk_university = Column(UUID, ForeignKey("university.id"), nullable=False)

    university = relationship("University")
    professors = relationship(
        "Professor", back_populates="dependencies", secondary="professor_dependency"
    )
    courses = relationship("Course", back_populates="dependency")

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
