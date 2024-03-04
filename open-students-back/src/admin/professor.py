from sqladmin import ModelView
from ..models.professor import Professor


class ProfessorAdmin(ModelView, model=Professor):
    name = "Professor"
    name_plural = "Professors"
    column_searchable_list = ["id", "name"]
    column_list = ["id", "name"]
    form_columns = ["name", "dependencies"]
    form_ajax_refs = dict(
        dependencies=dict(
            fields=["name", "abbreviation"],
            order_by="name",
        ),
    )
