from src.models.base import Base
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID


class Student(Base):
    __tablename__ = "student"

    name = Column(String, nullable=False)
    nickname = Column(String)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    fk_university = Column(UUID, ForeignKey("university.id"), nullable=False)

    reviews = relationship("Review", back_populates="creator")
    university = relationship("University")

    def __str__(self):
        return f"{self.name} - {self.email}"

    def __repr__(self):
        return f"{self.name} - {self.email}"
