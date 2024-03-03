from sqladmin import ModelView
from ..models.university import University


class UniversityAdmin(ModelView, model=University):
    name = "University"
    name_plural = "Universities"
    column_searchable_list = ["id", "name", "nickname"]
    column_list = ["id", "name", "nickname"]
    form_columns = ["name", "nickname"]
