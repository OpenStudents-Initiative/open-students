from sqlalchemy.orm import Session
from src.services.crud.base import CRUDBase
from src.schemas.review import ReviewCreate, ReviewUpdate
from src.models.review import Review
from src.schemas.review import Review as ReviewSchema
from datetime import datetime


class CRUDReview(CRUDBase[Review, ReviewCreate, ReviewUpdate]):
    def create(self, db: Session, *, obj_in: ReviewCreate, creator: str) -> Review:
        db_obj = Review(
            fk_professor=obj_in.professor,
            fk_creator=creator,
            fk_academic_period=obj_in.academicPeriod,
            fk_course=obj_in.course,
            general_rating=obj_in.generalRating,
            course_grade=obj_in.courseGrade,
            difficulty_level=obj_in.difficultyLevel,
            review=obj_in.review,
            would_enroll_again=obj_in.wouldEnrollAgain,
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)

        return ReviewSchema(
            id=db_obj.id,
            course=db_obj.course.name,
            period=db_obj.academic_period.name,
            createdAt=(
                db_obj.created_at.strftime("%Y-%m-%d")
                if isinstance(db_obj.created_at, datetime)
                else db_obj.created_at
            ),
            review=db_obj.review,
            generalRating=db_obj.general_rating,
            difficultyLevel=db_obj.difficulty_level,
            courseGrade=db_obj.course_grade,
            wouldEnrollAgain=db_obj.would_enroll_again,
        )


review_service = CRUDReview(Review)
