from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.services.crud.base import CRUDBase
from src.schemas.student import StudentCreate, StudentUpdate, StudentLogin
from src.schemas.student import Student as StudentSchema
from src.models.student import Student

TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MDc5MjUwMDgsImV4cCI6MTczOTQ2MTAwOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Pr24VsJ0XpVUgZ_o1mSNWiJK7J811XfrhiMqRkkbPcQ"


class CRUDStudent(CRUDBase[Student, StudentCreate, StudentUpdate]):
    # TODO: Implement password hashing
    def hashed_password(self, password: str) -> str:
        return password

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

        # TODO: Implement token generation
        return StudentLogin(token=TOKEN, userInfo=student)


student_service = CRUDStudent(Student)
