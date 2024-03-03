from pydantic import BaseModel, UUID4


class CourseBase(BaseModel):
    pass


class Course(CourseBase):
    id: UUID4
    code: int
    courseName: str

    class Config:
        orm_mode = True
