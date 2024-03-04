# professor.py
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from src.models.base import Base
from sqlalchemy.dialects.postgresql import UUID


class Professor(Base):
    __tablename__ = "professor"

    name = Column(String, nullable=False)

    dependencies = relationship(
        "Dependency", back_populates="professors", secondary="professor_dependency"
    )
    reviews = relationship("Review", back_populates="professor")

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
