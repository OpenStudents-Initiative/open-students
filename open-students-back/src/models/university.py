# university.py
from sqlalchemy import Column, String
from src.models.base import Base


class University(Base):
    __tablename__ = "university"

    name = Column(String, nullable=False, unique=True)
    nickname = Column(String)
