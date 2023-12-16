from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Collection

def character_max_60(form, field):
    if len(field.data) > 60:
        raise ValidationError("Input must not exceed 60 characters.")

class CollectionForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), character_max_60()])
