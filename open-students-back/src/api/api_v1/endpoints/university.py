from fastapi import APIRouter, Depends
from src.schemas.university import University, UniversityCreate, UniversityUpdate
from src.services.university import university_service
from sqlalchemy.orm import Session
from src.config.db_config import get_db
from uuid import UUID


router = APIRouter()


@router.get("/", response_model=list[University])
async def read_university(db: Session = Depends(get_db)):
    return university_service.get_all(db=db)


@router.get("/{university_id}")
async def read_university(university_id: UUID, db: Session = Depends(get_db)):
    return university_service.get(db=db, id=university_id)


@router.post("/")
async def create_university(
    university: UniversityCreate, db: Session = Depends(get_db)
):
    return university_service.create(db=db, obj_in=university)


@router.put("/{university_id}")
async def update_university(
    university_id: UUID, university: UniversityUpdate, db: Session = Depends(get_db)
):
    return university_service.update(db=db, id=university_id, obj_in=university)


@router.delete("/{university_id}")
async def delete_university(university_id: UUID, db: Session = Depends(get_db)):
    return university_service.remove(db=db, id=university_id)
