# course.py
from sqlalchemy import Column, SmallInteger, String
from src.models.base import Base


class Course(Base):
    __tablename__ = "course"

    name = Column(String, nullable=False)
    number = Column(SmallInteger)
