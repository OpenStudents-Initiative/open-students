from sqladmin import ModelView
from ..models.academic_period import AcademicPeriod


class AcademicPeriodAdmin(ModelView, model=AcademicPeriod):
    name = "Academic Period"
    name_plural = "Academic Periods"
    column_searchable_list = ["id", "name"]
    column_list = ["id", "name", "start_date", "end_date"]
    form_columns = ["name", "start_date", "end_date"]
