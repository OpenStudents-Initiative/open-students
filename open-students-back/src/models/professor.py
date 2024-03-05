# professor.py
from sqlalchemy import String
from sqlalchemy.orm import mapped_column, relationship

from src.models.base import Base


class Professor(Base):
    __tablename__ = "professor"

    name = mapped_column(String, nullable=False)

    dependencies = relationship(
        "Dependency", back_populates="professors", secondary="professor_dependency"
    )
    reviews = relationship("Review", back_populates="professor")

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
