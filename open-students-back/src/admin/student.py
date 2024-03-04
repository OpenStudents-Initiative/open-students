from sqladmin import ModelView
from ..models.student import Student


class StudentAdmin(ModelView, model=Student):
    name = "Student"
    name_plural = "Students"
    column_searchable_list = ["id", "name", "email", "nickname"]
    column_list = ["id", "name", "email", "nickname", "university"]
    form_columns = ["name", "nickname", "email", "password", "university"]
    form_ajax_refs = dict(
        university=dict(
            fields=["name", "nickname"],
            order_by="name",
        ),
    )
