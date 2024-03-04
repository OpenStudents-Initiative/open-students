from fastapi import FastAPI
from fastapi.routing import APIRoute
from sqladmin import Admin
from .admin.authentication_backend import AdminAuth
from .config.db_config import engine
from .models.base import Base
from starlette.middleware.cors import CORSMiddleware
from .api.api_v1.api import api_router
from .config.settings import Settings
from .models import (
    academic_period,
    course,
    dependency,
    professor,
    review,
    academic_period_course,
    professor_dependency,
    student,
)
from .admin.review import ReviewAdmin
from .admin.student import StudentAdmin
from .admin.course import CourseAdmin
from .admin.dependency import DependencyAdmin
from .admin.university import UniversityAdmin
from .admin.professor import ProfessorAdmin
from .admin.academic_period import AcademicPeriodAdmin

settings = Settings()


def custom_generate_unique_id(route: APIRoute):
    return f"{route.tags[0]}-{route.name}"


def create_tables():
    Base.metadata.create_all(bind=engine)


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    generate_unique_id_function=custom_generate_unique_id,
)

authentication_backend = AdminAuth(secret_key=settings.SECRET_KEY)

admin = Admin(
    app,
    engine,
    authentication_backend=authentication_backend,
    title="OpenStudents Admin",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

# Routes
app.include_router(api_router)

# Admin
admin.add_view(UniversityAdmin)
admin.add_view(StudentAdmin)
admin.add_view(DependencyAdmin)
admin.add_view(AcademicPeriodAdmin)
admin.add_view(CourseAdmin)
admin.add_view(ProfessorAdmin)
admin.add_view(ReviewAdmin)
