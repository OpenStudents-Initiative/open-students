from pydantic import BaseModel


class DependencyBase(BaseModel):
    pass


class Dependency(DependencyBase):
    name: str
    abbreviation: str


class DependencyCreate(DependencyBase):
    name: str
    abbreviation: str


class DependencyUpdate(DependencyBase):
    name: str | None = None
    abbreviation: str | None = None
