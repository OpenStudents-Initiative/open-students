from pydantic import BaseModel, UUID4


class UniversityBase(BaseModel):
    pass


class University(UniversityBase):
    id: UUID4
    name: str
    nickname: str | None = None

    class Config:
        orm_mode = True


class UniversityCreate(UniversityBase):
    name: str
    nickname: str | None = None


class UniversityUpdate(UniversityBase):
    name: str | None = None
    nickname: str | None = None
