from sqladmin import ModelView
from ..models.review import Review
from wtforms import TextAreaField


class ReviewAdmin(ModelView, model=Review):
    name = "Review"
    name_plural = "Reviews"
    column_list = ["id", "professor", "creator", "review", "created_at"]
    column_searchable_list = ["id", "review"]
    form_overrides = dict(review=TextAreaField)
    form_excluded_columns = ["created_at"]
    form_widget_args = dict(review={"rows": 10})
    form_ajax_refs = dict(
        professor=dict(
            fields=["name"],
            order_by="name",
        ),
        creator=dict(
            fields=["email", "name"],
            order_by="email",
        ),
        course=dict(
            fields=["name", "number"],
            order_by="name",
        ),
        academic_period=dict(
            fields=["name"],
            order_by="name",
        ),
    )
