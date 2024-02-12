from typing import Any, Dict, Generic, Optional, Type, TypeVar, Union, List
from fastapi import HTTPException

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

ModelType = TypeVar("ModelType", bound=Any)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).

        **Parameters**

        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    def get_all(
        self, db: Session, *, skip: int = 0, limit: int = 100
    ) -> List[ModelType]:
        return db.query(self.model).offset(skip).limit(limit).all()

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        obj = db.query(self.model).filter(self.model.id == id).first()
        if obj is None:
            raise HTTPException(
                status_code=404, detail=f"{self.model.__name__} with id {id} not found"
            )
        return obj

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)  # type: ignore
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self, db: Session, *, id: Any, obj_in: Union[UpdateSchemaType, Dict[str, Any]]
    ) -> ModelType:
        db_obj = db.query(self.model).get(id)

        if db_obj is None:
            raise HTTPException(
                status_code=404, detail=f"{self.model.__name__} with id {id} not found"
            )

        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> ModelType:
        obj = db.query(self.model).get(id)
        if obj is None:
            raise HTTPException(
                status_code=404, detail=f"{self.model.__name__} with id {id} not found"
            )
        db.delete(obj)
        db.commit()
        return obj
