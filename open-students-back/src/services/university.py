from sqlalchemy.orm import Session
from src.services.crud.base import CRUDBase
from src.schemas.university import UniversityCreate, UniversityUpdate
from src.models.university import University


class CRUDUniversity(CRUDBase[University, UniversityCreate, UniversityUpdate]):
    pass


university_service = CRUDUniversity(University)
