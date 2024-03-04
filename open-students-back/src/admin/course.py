from sqladmin import ModelView
from ..models.course import Course


class CourseAdmin(ModelView, model=Course):
    name = "Course"
    name_plural = "Courses"
    column_searchable_list = ["id", "name"]
    column_list = ["id", "name", "number", "academic_periods"]
    form_columns = ["name", "number", "academic_periods", "dependency"]
    form_ajax_refs = dict(
        dependency=dict(
            fields=["name", "abbreviation"],
            order_by="name",
        ),
        academic_periods=dict(
            fields=["name"],
            order_by="name",
        ),
    )
