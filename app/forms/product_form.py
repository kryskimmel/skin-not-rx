from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Product

def character_max_60():
    pass

def character_max_200():
    pass

def character_max_500():
    pass

class ProductForm(FlaskForm):
    brand_name = StringField('brand_name', validators=[DataRequired()])
    product_name = StringField('product_name', validators=[DataRequired()])
    product_type = StringField('product_type', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    key_ingredients = StringField('key_ingredients')
    skin_concern = StringField('skin_concern', validators=[DataRequired()])
    product_link = StringField('product_link')
    notes = StringField('notes')
