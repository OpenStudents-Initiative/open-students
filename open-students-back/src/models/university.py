# university.py
from sqlalchemy import String
from sqlalchemy.orm import mapped_column

from src.models.base import Base


class University(Base):
    __tablename__ = "university"

    name = mapped_column(String, nullable=False, unique=True)
    nickname = mapped_column(String)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name
