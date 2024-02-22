from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Collection

def character_max_60(form, field):
    if len(field.data) > 60:
        raise ValidationError("Input must not exceed 60 characters.")

def character_min_3(form, field):
    if len(field.data) < 3:
        raise ValidationError("Input must be at least 3 characters long.")

def starting_with_spaces(form, field):
    if field.data and (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')

class CollectionForm(FlaskForm):
    name = StringField('name', validators=[DataRequired(), character_max_60, character_min_3, starting_with_spaces])
