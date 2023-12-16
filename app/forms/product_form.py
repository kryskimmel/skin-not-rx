from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product

def character_max_60(form, field):
    if len(field.data) > 60:
        raise ValidationError("Input must not exceed 60 characters.")

def character_max_300(form, field):
    if len(field.data) > 300:
        raise ValidationError("Input must not exceed 300 characters.")

def character_max_500(form, field):
    if len(field.data) > 500:
        raise ValidationError("Input must not exceed 500 characters.")

def character_min_3(form, field):
    if field.data and len(field.data) < 3:
        raise ValidationError("Input must be at least 3 characters long.")

class ProductForm(FlaskForm):
    brand_name = StringField('brand_name', validators=[DataRequired(), character_max_60])
    product_name = StringField('product_name', validators=[DataRequired(), character_max_60])
    product_type = StringField('product_type', validators=[DataRequired(), character_max_60])
    description = StringField('description', validators=[DataRequired(), character_max_500])
    key_ingredients = StringField('key_ingredients', validators=[character_max_500, character_min_3])
    skin_concern = StringField('skin_concern', validators=[DataRequired(), character_max_300])
    product_link = StringField('product_link', validators=[character_max_500, character_min_3])
    notes = StringField('notes', validators=[character_max_500, character_min_3])
