from typing import Annotated

from pydantic import UUID4, BaseModel, Field, StringConstraints


class ReviewBase(BaseModel):
    pass


class ReviewCreate(BaseModel):
    professor: UUID4
    course: UUID4
    academicPeriod: UUID4
    review: Annotated[str, StringConstraints(max_length=500)]
    generalRating: float = Field(..., ge=0, le=5)  # Ensures rating is between 0 and 5
    difficultyLevel: float = Field(..., ge=1, le=5)  # Ensures rating is between 1 and 5
    courseGrade: float = Field(..., ge=0, le=5)  # Ensures grade is between 0 and 5
    wouldEnrollAgain: bool

    class Config:
        schema_extra = {
            "example": {
                "creator": "123e4567-e89b-12d3-a456-426614174000",
                "professor": "123e4567-e89b-12d3-a456-426614174000",
                "course": "123e4567-e89b-12d3-a456-426614174000",
                "academicPeriod": "123e4567-e89b-12d3-a456-426614174000",
                "review": "Great professor! Very clear and helpful.",
                "generalRating": 5,
                "difficultyLevel": 4,
                "courseGrade": 5,
                "wouldEnrollAgain": True,
            }
        }


class ReviewUpdate(BaseModel):
    review: Annotated[str, StringConstraints(max_length=500)]
    generalRating: float = Field(..., ge=0, le=5)  # Ensures rating is between 0 and 5
    difficultyLevel: float = Field(..., ge=1, le=5)  # Ensures rating is between 1 and 5
    courseGrade: float = Field(..., ge=0, le=5)  # Ensures grade is between 0 and 5
    wouldEnrollAgain: bool

    class Config:
        schema_extra = {
            "example": {
                "review": "Great professor! Very clear and helpful.",
                "generalRating": 5,
                "difficultyLevel": 4,
                "courseGrade": 5,
                "wouldEnrollAgain": True,
            }
        }


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
