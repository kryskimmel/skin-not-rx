from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileField, FileAllowed, FileRequired
from app.awsS3 import ALLOWED_EXTENSIONS
from app.models import Product

def char_max60(form, field):
    if len(field.data) > 60:
        raise ValidationError("Input must not exceed 60 characters")

def char_max500(form, field):
    if len(field.data) > 500:
        raise ValidationError("Input must not exceed 500 characters")

def char_min2(form, field):
    if len(field.data) < 2:
        raise ValidationError("Input must be at least 2 characters long")
    
def char_min4(form, field):
    if len(field.data) < 4:
        raise ValidationError("Input must be at least 4 characters long")

def beginning_spaces(form, field):
    if field.data.startswith(' '):
        raise ValidationError("Input cannot begin with a space")


def product_name_exists(form, field):
    product_name = field.data
    product_exists = Product.query.filter(Product.product_name == product_name).first()
    if product_exists:
        raise ValidationError("Please add a different product as a product with this name already exists")

class ProductForm(FlaskForm):
    brand_name = StringField(
        'brand_name', 
        validators=[
            DataRequired(), 
            char_min2,
            char_max60,
            beginning_spaces
        ])
    product_name = StringField(
        'product_name', 
        validators=[
            DataRequired(), 
            char_min2,
            char_max60,
            beginning_spaces
        ])
    product_type = StringField(
        'product_type', 
        validators=[
            DataRequired(),
        ])
    description = StringField(
        'description', 
        validators=[
            DataRequired(),
            char_min4,
            char_max500,
            beginning_spaces
        ])
    key_ingredients = StringField(
        'key_ingredients', 
        validators=[
            char_min2,
            char_max500,
            beginning_spaces
        ])
    product_link = StringField(
        'product_link', 
        validators=[
            char_min4,
            char_max500,
            beginning_spaces
        ])
    image_url = FileField(
        'image_url', 
        validators=[
            FileRequired(), 
            FileAllowed(ALLOWED_EXTENSIONS)
        ])