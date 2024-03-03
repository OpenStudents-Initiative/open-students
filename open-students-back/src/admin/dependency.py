from sqladmin import ModelView
from ..models.dependency import Dependency


class DependencyAdmin(ModelView, model=Dependency):
    name = "Dependency"
    name_plural = "Dependencies"
    column_searchable_list = ["id", "name", "abbreviation"]
    column_list = ["id", "name", "abbreviation", "university"]
    form_columns = ["name", "abbreviation", "university"]
    form_ajax_refs = dict(
        university=dict(
            fields=["name", "nickname"],
            order_by="name",
        ),
    )
