from fastapi import HTTPException
from typing import Any, List
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.services.crud.base import CRUDBase
from src.schemas.professor import ProfessorCreate, ProfessorUpdate
from src.schemas.professor import Professor as ProfessorSchema
from src.models.professor import Professor
from src.models.university import University
from src.models.dependency import Dependency
from src.models.professor_dependency import ProfessorDependency
from src.models.review import Review
from src.schemas.review import Review as ReviewSchema
from src.schemas.course import Course as CourseSchema
from datetime import datetime
from src.models.course import Course
from src.models.academic_period import AcademicPeriod


class CRUDProfessor(CRUDBase[Professor, ProfessorCreate, ProfessorUpdate]):

    def get_all(
        self, db: Session, *, skip: int = 0, limit: int = 100, keys: str | None
    ) -> List[Professor]:
        professors = super().get_all(db, skip=skip, limit=limit)

        if keys:
            desired_keys = keys.split(",")
            filtered_professors = []
            for professor in professors:
                professor_dict = professor.__dict__
                filtered_dict = {
                    k: v for k, v in professor_dict.items() if k in desired_keys
                }
                filtered_professors.append(Professor(**filtered_dict))
            return filtered_professors
        return professors

    def get(self, db: Session, id: Any) -> Professor | None:
        query = (
            db.query(
                Professor.id,
                Professor.name,
                Dependency.name.label("dependency_name"),
                University.name.label("university_name"),
                func.avg(Review.general_rating).label("averageRating"),
                func.avg(Review.course_grade).label("averageCourseGrade"),
                func.avg(Review.difficulty_level).label("averageDifficultyLevel"),
            )
            .join(Review, Professor.id == Review.fk_professor)
            .join(Professor.dependencies)
            .join(Dependency.university)
            .filter(Professor.id == id)
            .group_by(Professor.id, Professor.name, Dependency.name, University.name)
            .one_or_none()
        )

        if query:
            professor = ProfessorSchema(
                id=query.id,
                name=query.name,
                dependency=query.dependency_name,
                university=query.university_name,
                averageRating=query.averageRating,
                averageCourseGrade=query.averageCourseGrade,
                averageDifficultyLevel=query.averageDifficultyLevel,
            )

            return professor
        raise HTTPException(status_code=404, detail=f"Professor with id {id} not found")

    def get_professor_reviews(self, db: Session, id: Any) -> List[Review]:
        reviews_query = (
            db.query(
                Review.id,
                Course.name.label("course"),
                AcademicPeriod.name.label("period"),
                Review.created_at.label("createdAt"),
                Review.review,
                Review.general_rating.label("generalRating"),
                Review.difficulty_level.label("difficultyLevel"),
                Review.course_grade.label("courseGrade"),
                Review.would_enroll_again.label("wouldEnrollAgain"),
                Review.fk_professor.label("professorId"),
            )
            .join(Course, Review.fk_course == Course.id)
            .join(AcademicPeriod, Review.fk_academic_period == AcademicPeriod.id)
            .filter(Review.fk_professor == id)
            .all()
        )

        reviews = [
            ReviewSchema(
                id=str(review.id),
                course=review.course,
                period=review.period,
                createdAt=(
                    review.createdAt.strftime("%Y-%m-%d")
                    if isinstance(review.createdAt, datetime)
                    else review.createdAt
                ),
                review=review.review,
                generalRating=review.generalRating,
                difficultyLevel=review.difficultyLevel,
                courseGrade=review.courseGrade,
                wouldEnrollAgain=review.wouldEnrollAgain,
                professorId=str(review.professorId),
            )
            for review in reviews_query
        ]

        return reviews

    def get_professor_courses(self, db: Session, id: Any) -> List[Course]:
        courses_query = (
            db.query(Course.id, Course.number, Course.name.label("courseName"))
            .join(
                Dependency.professors
            )  # Joins through the association table to Professor
            .join(
                Dependency.courses
            )  # Adjust this join depending on your relationship setup
            .filter(Professor.id == id)
            .distinct()  # Ensures unique courses are fetched
            .all()
        )

        # Convert query results to Pydantic models
        courses = [
            CourseSchema(
                id=str(course.id), code=course.number, courseName=course.courseName
            )
            for course in courses_query
        ]

        return courses


professor_service = CRUDProfessor(Professor)
