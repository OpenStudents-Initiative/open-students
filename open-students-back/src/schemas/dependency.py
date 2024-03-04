from pydantic import BaseModel, UUID4, Field


class DependencyBase(BaseModel):
    pass


class DependencyCreate(DependencyBase):
    name: str
    abbreviation: str


class DependencyUpdate(DependencyBase):
    name: str | None = None
    abbreviation: str | None = None
