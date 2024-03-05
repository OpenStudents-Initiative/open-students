from src.models.university import University as UniversityModel
from src.schemas.university import University, UniversityCreate, UniversityUpdate
from src.services.crud.base import CRUDBase


class CRUDUniversity(
    CRUDBase[UniversityModel, University, UniversityCreate, UniversityUpdate]
):
    pass


university_service = CRUDUniversity(UniversityModel, University)
