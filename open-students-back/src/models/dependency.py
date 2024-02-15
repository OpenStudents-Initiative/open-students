# dependency.py
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from src.models.base import Base


class Dependency(Base):
    __tablename__ = "dependency"

    name = Column(String, nullable=False)
    abbreviation = Column(String)
    fk_university = Column(UUID, ForeignKey("university.id"), nullable=False)
