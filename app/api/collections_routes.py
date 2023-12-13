from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection, db

collections_routes = Blueprint('collections', __name__)

# Get all collections
