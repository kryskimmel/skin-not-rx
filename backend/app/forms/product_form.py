from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.awsS3 import ALLOWED_EXTENSIONS
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

def starting_with_spaces(form, field):
    if field.data and (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')


def product_name_exists(form, field):
    product_name = field.data
    product_exists = Product.query.filter(Product.product_name == product_name).first()
    if product_exists:
        raise ValidationError('This product already exists. Please try adding a different product.')

class ProductForm(FlaskForm):
    brand_name = StringField('brand_name', validators=[DataRequired(), character_max_60, starting_with_spaces])
    product_name = StringField('product_name', validators=[DataRequired(), character_max_60, starting_with_spaces])
    product_type = StringField('product_type', validators=[DataRequired(), character_max_60, starting_with_spaces])
    description = StringField('description', validators=[DataRequired(), character_max_500, starting_with_spaces])
    key_ingredients = StringField('key_ingredients', validators=[character_max_500, character_min_3, starting_with_spaces])
    product_link = StringField('product_link', validators=[character_max_500, character_min_3, starting_with_spaces])
    image_url = FileField('image_url', validators=[FileRequired(), FileAllowed(ALLOWED_EXTENSIONS)])
