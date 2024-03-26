from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.awsS3 import ALLOWED_EXTENSIONS
from app.models import User
import re


def email_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError("Email address is already in use")


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError("Username is already in use")
    
def char_max255(form, field):
    if len(field.data) > 255:
        raise ValidationError("Input must not exceed 255 characters")
    
def char_max20(form, field):
    if len(field.data) > 20:
        raise ValidationError("Input must not exceed 20 characters")

def char_min2(form, field):
    if len(field.data) < 2:
        raise ValidationError("Input must be at least 2 characters long")
    
def char_min4(form, field):
    if len(field.data) < 4:
        raise ValidationError("Input must be at least 4 characters long")

def password_min(form, field):
    password = field.data
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long")

def beginning_spaces(form, field):
    if field.data.startswith(' '):
        raise ValidationError("Input cannot begin with a space")

def format_email(form, field):
    email = field.data
    email_pattern = r"^[^\s@]+@[^\s@]+\.[^\s@]{2,}$"
    if not re.match(email_pattern, email):
        raise ValidationError("Not a valid email")

def format_username(form, field):
    username = field.data
    username_pattern = r"^[A-Za-z0-9][A-Za-z0-9_-]*[A-Za-z0-9]$"
    if not re.match(username_pattern, username):
        raise ValidationError("Not a valid username")


def format_letters_only(form, field):
    name_pattern = r"^[a-zA-Z]*$"
    if not re.match(name_pattern, field.data):
        raise ValidationError("Input can only contain letters")



class SignUpForm(FlaskForm):
    first_name = StringField(
        'first_name', 
        validators=[
            DataRequired(), 
            format_letters_only, 
            char_min2,
            char_max20,
            beginning_spaces
        ])
    last_name = StringField(
        'last_name', 
        validators=[
            DataRequired(), 
            format_letters_only, 
            char_min2,
            char_max20,
            beginning_spaces
        ])
    username = StringField(
        'username', 
        validators=[
            DataRequired(), 
            username_exists, 
            # char_min4,
            # char_max20,
            # beginning_spaces,
            # format_username
        ])
    email = StringField(
        'email', 
        validators=[
            DataRequired(), 
            email_exists, 
            # format_email,
            # char_min4,
            # char_max20,
            # beginning_spaces
        ])
    password = StringField(
        'password', 
        validators=[
            DataRequired(), 
            password_min,
            char_max255,
            beginning_spaces
        ])
    profile_image = FileField(
        'profile_image', 
        validators=[
            FileRequired(), 
            FileAllowed(list(ALLOWED_EXTENSIONS))
        ])
    skin_type = StringField(
        'skin_type', 
        validators=[
            DataRequired(), 
        ])