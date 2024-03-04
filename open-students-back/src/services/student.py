from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.services.crud.base import CRUDBase
from src.schemas.student import StudentCreate, StudentUpdate, StudentLogin
from src.schemas.student import Student as StudentSchema
from src.models.student import Student
import jwt
from datetime import datetime, timedelta
from src.config.settings import Settings

settings = Settings()


class CRUDStudent(CRUDBase[Student, StudentCreate, StudentUpdate]):
    def hashed_password(self, password: str) -> str:
        return password

    def generate_token(self, student: StudentSchema) -> str:
        payload = {
            "id": str(student.id),
            "email": student.email,
            "exp": datetime.utcnow() + timedelta(days=1),
        }

        token = jwt.encode(
            payload=payload, key=settings.SECRET_KEY, algorithm=settings.ALGORITHM
        )

        return token

    def login(self, db: Session, email: str, password: str):
        db_student = (
            db.query(self.model)
            .filter(
                self.model.email == email,
                self.model.password == self.hashed_password(password),
            )
            .first()
        )

        if not db_student:
            raise HTTPException(status_code=404, detail="Incorrect email or password")

        student = StudentSchema(
            id=db_student.id,
            name=db_student.name,
            nickname=db_student.nickname,
            email=db_student.email,
            fk_university=db_student.fk_university,
        )

        token = self.generate_token(student)
        return StudentLogin(token=token, userInfo=student)


student_service = CRUDStudent(Student)
