from sqlalchemy import ForeignKey, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import mapped_column, relationship

from src.models.base import Base


class Student(Base):
    __tablename__ = "student"

    name = mapped_column(String, nullable=False)
    nickname = mapped_column(String)
    email = mapped_column(String, nullable=False, unique=True)
    password = mapped_column(String, nullable=False)
    fk_university = mapped_column(UUID, ForeignKey("university.id"), nullable=False)

    reviews = relationship("Review", back_populates="creator")
    university = relationship("University")

    def __str__(self):
        return f"{self.name} - {self.email}"

    def __repr__(self):
        return f"{self.name} - {self.email}"
