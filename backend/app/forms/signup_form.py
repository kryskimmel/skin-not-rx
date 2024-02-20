from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.awsS3 import ALLOWED_EXTENSIONS
from app.models import User
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def character_max_15(form, field):
    if len(field.data) > 15:
        raise ValidationError("Input must not exceed 15 characters.")

def character_max_60(form, field):
    if len(field.data) > 60:
        raise ValidationError("Input must not exceed 60 characters.")

def character_max_255(form, field):
    if len(field.data) > 255:
        raise ValidationError("Input must not exceed 255 characters.")

def character_min_3(form, field):
    if field.data and len(field.data) < 3:
        raise ValidationError("Input must be at least 3 characters long.")

def password_length(form, field):
    password = field.data
    if len(password) < 6:
        raise ValidationError('Password must be at least 6 characters long.')

def starting_with_spaces(form, field):
    if field.data and (field.data).startswith(' '):
        raise ValidationError('Input cannot begin with a space.')

def email_format(form, field):
    email = field.data
    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
    if not re.match(email_pattern, email):
        raise ValidationError("Not a valid email.")

def username_format(form, field):
    username = field.data
    username_pattern = r"^[A-Za-z0-9][A-Za-z0-9_-]*[A-Za-z0-9]$"
    if not re.match(username_pattern, username):
        raise ValidationError("Not a valid username.")


def name_format(form, field):
    name_pattern = r"^[a-zA-Z]*$"
    if not re.match(name_pattern, field.data):
        raise ValidationError("Input can only contain letters.")



class SignUpForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired(), name_format, character_max_15, starting_with_spaces])
    last_name = StringField('last_name', validators=[DataRequired(), name_format, character_max_15, starting_with_spaces])
    username = StringField('username', validators=[DataRequired(), username_exists, character_max_15, character_min_3, starting_with_spaces, username_format])
    email = StringField('email', validators=[DataRequired(), user_exists, email_format, character_max_60, character_min_3, starting_with_spaces])
    password = StringField('password', validators=[DataRequired(), character_max_15, password_length, starting_with_spaces])
    profile_image = FileField('profile_image', validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    skin_type = StringField('skin_type', validators=[DataRequired(), character_max_255, starting_with_spaces])
