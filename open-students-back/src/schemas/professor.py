from pydantic import UUID4, BaseModel


class ProfessorBase(BaseModel):
    name: str


class ProfessorCreate(ProfessorBase):
    university: UUID4
    dependency: UUID4


class Professor(ProfessorBase):
    id: UUID4
    name: str
    university: str
    dependency: str
    averageRating: float | None = None
    averageCourseGrade: float | None = None
    averageDifficultyLevel: float | None = None

    class Config:
        orm_mode = True


class ProfessorUpdate(BaseModel):
    name: str | None = None
    dependency: str | None = None
