# university.py
from sqlalchemy import Column, String
from src.models.base import Base


class University(Base):
    __tablename__ = "university"

    nickname = Column(String)
    name = Column(String, nullable=False)
