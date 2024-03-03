from sqlalchemy.orm import Session
from src.services.crud.base import CRUDBase
from src.schemas.dependency import DependencyCreate, DependencyUpdate
from src.models.dependency import Dependency


class CRUDDependency(CRUDBase[Dependency, DependencyCreate, DependencyUpdate]):
    pass


dependency_service = CRUDDependency(Dependency)
