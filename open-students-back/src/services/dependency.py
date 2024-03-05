from src.models.dependency import Dependency as DependencyModel
from src.schemas.dependency import Dependency, DependencyCreate, DependencyUpdate
from src.services.crud.base import CRUDBase


class CRUDDependency(
    CRUDBase[DependencyModel, Dependency, DependencyCreate, DependencyUpdate]
):
    pass


dependency_service = CRUDDependency(DependencyModel, Dependency)
