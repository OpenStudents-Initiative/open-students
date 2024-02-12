from fastapi import FastAPI
from fastapi.routing import APIRoute
from .config.db_config import engine
from .models.base import Base
from starlette.middleware.cors import CORSMiddleware

from .models import (
    academic_period,
    course,
    dependency,
    professor,
    review,
    academic_period_course,
    professor_dependency,
)

from .api.api_v1.api import api_router
from .config.settings import Settings

settings = Settings()


def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)


def create_tables():
    Base.metadata.create_all(bind=engine)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()
app.include_router(api_router)
