from fastapi import FastAPI
from .config.db_config import engine
from .models.base import Base

from .models import (
    academic_period,
    course,
    dependency,
    professor,
    review,
    university,
    academic_period_course,
    professor_dependency,
)


app = FastAPI()


def create_tables():
    Base.metadata.create_all(bind=engine)


create_tables()


# app.include_router(academic_period.router)
# app.include_router(course.router)
# app.include_router(dependency.router)
# app.include_router(professor.router)
# app.include_router(review.router)
# app.include_router(university.router)
