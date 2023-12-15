from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Favorite_Product, Favorite_Collection, db

current_user_routes = Blueprint('current', __name__)


@current_user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@current_user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()


# View current user's favorite products
@current_user_routes.route('/favorites/products', method=['GET'])
@login_required
def view_favorites():
    favorite_products = Favorite_Product.query.all()
    favorite_products_list = []

    for product in favorite_products:
        fave_product = {
            'id': product.id,
            'user_id': current_user.id,
            'product_id': product.product_id
        }
        favorite_products_list.append(fave_product)

    for collection in favorite_products:
        fave_collection = {
            'id': collection.id,
            'user_id': current_user.id,
            'collection_id': collection.collection_id
        }
        favorite_products_list.append(fave_collection)
    return jsonify({'Favorites': favorite_products_list})


# View current user's favorite collections
@current_user_routes.route('/favorites/collections', method=['GET'])
@login_required
def view_favorites():
    favorite_collections = Favorite_Collection.query.all()
    favorite_collections_list = []

    for collection in favorite_collections:
        fave_collection = {
            'id': collection.id,
            'user_id': current_user.id,
            'collection_id': collection.collection_id
        }
        favorite_collections_list.append(fave_collection)
    return jsonify({'Favorite Collections': favorite_collections_list})


# Add a favorite
@current_user_routes.route('/favorites', method=['POST'])
def add_favorite():
    pass


# Delete a favorited product



# Delete a favorited collection
