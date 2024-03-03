from pydantic import BaseModel, UUID4, Field


class ReviewBase(BaseModel):
    pass


class Review(ReviewBase):
    id: UUID4
    course: str
    period: str
    createdAt: str
    review: str
    generalRating: float
    difficultyLevel: float
    courseGrade: float
    wouldEnrollAgain: bool

    class Config:
        orm_mode = True
