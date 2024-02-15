# professor.py
from sqlalchemy import Column, String
from src.models.base import Base


class Professor(Base):
    __tablename__ = "professor"

    name = Column(String, nullable=False)
