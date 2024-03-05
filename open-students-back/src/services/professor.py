from datetime import datetime
from typing import Any, Dict, List
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy import func
from sqlalchemy.orm import Session

from src.models.academic_period import AcademicPeriod
from src.models.course import Course
from src.models.dependency import Dependency
from src.models.professor import Professor as ProfessorModel
from src.models.review import Review as ReviewModel
from src.models.university import University
from src.schemas.course import Course as CourseSchema
from src.schemas.professor import Professor, ProfessorCreate, ProfessorUpdate
from src.services.crud.base import CRUDBase


class CRUDProfessor(
    CRUDBase[ProfessorModel, Professor, ProfessorCreate, ProfessorUpdate]
):
    def get_all_with_keys(
        self, db: Session, *, skip: int = 0, limit: int = 100, keys: str
    ) -> List[Dict[str, Any]]:
        professors = self.get_all(db, skip=skip, limit=limit)
        desired_keys = keys.split(",")
        filtered_professors = []
        for professor in professors:
            professor_dict = professor.__dict__
            filtered_dict = {
                k: v for k, v in professor_dict.items() if k in desired_keys
            }
            filtered_professors.append(filtered_dict)
        return filtered_professors

    def get(self, db: Session, id: UUID) -> ProfessorModel:
        query = (
            db.query(
                ProfessorModel.id,
                ProfessorModel.name,
                Dependency.name.label("dependency_name"),
                University.name.label("university_name"),
                func.avg(ReviewModel.general_rating).label("averageRating"),
                func.avg(ReviewModel.course_grade).label("averageCourseGrade"),
                func.avg(ReviewModel.difficulty_level).label("averageDifficultyLevel"),
            )
            .join(ReviewModel, ProfessorModel.id == ReviewModel.fk_professor)
            .join(ProfessorModel.dependencies)
            .join(Dependency.university)
            .filter(ProfessorModel.id == id)
            .group_by(
                ProfessorModel.id, Professor.name, Dependency.name, University.name
            )
            .one_or_none()
        )

        if query:
            professor = ProfessorModel(
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

    def get_professor_reviews(self, db: Session, id: UUID) -> List[ReviewModel]:
        reviews_query = (
            db.query(
                ReviewModel.id,
                Course.name.label("course"),
                AcademicPeriod.name.label("period"),
                ReviewModel.created_at.label("createdAt"),
                ReviewModel.review,
                ReviewModel.general_rating.label("generalRating"),
                ReviewModel.difficulty_level.label("difficultyLevel"),
                ReviewModel.course_grade.label("courseGrade"),
                ReviewModel.would_enroll_again.label("wouldEnrollAgain"),
                ReviewModel.fk_professor.label("professorId"),
            )
            .join(Course, ReviewModel.fk_course == Course.id)
            .join(AcademicPeriod, ReviewModel.fk_academic_period == AcademicPeriod.id)
            .filter(ReviewModel.fk_professor == id)
            .all()
        )

        reviews = [
            ReviewModel(
                id=review.id,
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

    def get_professor_courses(self, db: Session, id: UUID) -> List[CourseSchema]:
        courses_query = (
            db.query(Course.id, Course.number, Course.name.label("courseName"))
            .join(
                Dependency.professors
            )  # Joins through the association table to Professor
            .join(
                Dependency.courses
            )  # Adjust this join depending on your relationship setup
            .filter(ProfessorModel.id == id)
            .distinct()  # Ensures unique courses are fetched
            .all()
        )

        # Convert query results to Pydantic models
        courses = [
            CourseSchema(id=course.id, code=course.number, courseName=course.courseName)
            for course in courses_query
        ]

        return courses


professor_service = CRUDProfessor(ProfessorModel, Professor)
