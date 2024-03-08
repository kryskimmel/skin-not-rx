from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Collection

def char_max20(form, field):
    if len(field.data) > 20:
        raise ValidationError("Input must not exceed 20 characters.")

def char_min2(form, field):
    if len(field.data) < 2:
        raise ValidationError("Input must be at least 2 characters long.")

def beginning_spaces(form, field):
    if field.data.startswith(' '):
        raise ValidationError('Input cannot begin with a space.')

class CollectionForm(FlaskForm):
    name = StringField(
        'name', 
        validators=[
            DataRequired(), 
            char_min2, 
            char_max20, 
            beginning_spaces
        ])
