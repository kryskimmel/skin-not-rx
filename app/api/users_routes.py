from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, User, Product, Collection, Favorite_Product, Favorite_Collection
from sqlalchemy.exc import IntegrityError

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}



@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()



# View current user's products
@user_routes.route('/current/products', methods=['GET'])
@login_required
def view_current_user_products():
    curr_user_products = Product.query.filter_by(user_id=current_user.id).all()

    if not curr_user_products:
        return {'message': 'You have not created any products.'}, 200

    curr_user_products_list = []
    for user_product in curr_user_products:
        product = {
            'id': user_product.id,
            'brand_name': user_product.brand_name,
            'product_name': user_product.product_name,
            'product_type': user_product.product_type,
            'description': user_product.description,
            'key_ingredients': user_product.key_ingredients,
            'product_link': user_product.product_link,
            'user_id': user_product.user_id,
            'preview_image': user_product.preview_image
        }
        is_favorited = Favorite_Product.query.filter_by(product_id=product['id']).first()
        product['is_favorite'] = True if is_favorited else False
        product['favorite_id'] = is_favorited.id if is_favorited else None

        curr_user_products_list.append(product)
    return jsonify(curr_user_products_list), 200



# View current user's collections
@user_routes.route('/current/collections', methods=['GET'])
@login_required
def view_current_user_collections():
    curr_user_collections = Collection.query.filter_by(user_id=current_user.id).all()

    if not curr_user_collections:
        return jsonify({'message': 'You have not created any collections.'}), 200

    curr_user_collections_list = []
    for user_collection in curr_user_collections:
        collection = {
            'id': user_collection.id,
            'name': user_collection.name,
            'user_id': user_collection.user_id,
            'Products': [{  
                'id': product.id,
                'brand_name': product.brand_name,
                'product_name': product.product_name,
                'product_type': product.product_type,
                'description': product.description,
                'key_ingredients': product.key_ingredients,
                'product_link': product.product_link,
                'user_id': product.user_id,
                'preview_image': product.preview_image
            } for product in user_collection.products]
        }
        is_favorited = Favorite_Collection.query.filter_by(collection_id=collection['id']).first()
        collection['is_favorite'] = True if is_favorited else False
        collection['favorite_id'] = is_favorited.id if is_favorited else None
        curr_user_collections_list.append(collection)
    return jsonify(curr_user_collections_list), 200


# View current user's FAVORITE products
@user_routes.route('/current/favorites/products', methods=['GET'])
@login_required
def view_favorite_products():
    favorite_products = Favorite_Product.query.filter_by(user_id=current_user.id).all()
    print('FAVE PRODS', favorite_products)

    if not favorite_products:
        return jsonify({'message': 'You do not have any favorited products yet!'})

    favorite_products_list = []
    for favorite_product in favorite_products:
        product = Product.query.get(favorite_product.product_id)
        if product:
            fave_product = {
                'id': favorite_product.id,
                'user_id': current_user.id,
                'product_id': favorite_product.product_id,
                'product_details': {
                    'id': product.id,
                    'brand_name': product.brand_name,
                    'product_name': product.product_name,
                    'product_type': product.product_type,
                    'description': product.description,
                    'key_ingredients': product.key_ingredients,
                    'product_link': product.product_link,
                    'preview_image': product.preview_image
                }
            }
            favorite_products_list.append(fave_product)
    
    return jsonify({'FavoriteProducts': favorite_products_list}), 200




# View current user's favorite collections
@user_routes.route('/current/favorites/collections', methods=['GET'])
@login_required
def view_favorite_collections():
    favorite_collections = Favorite_Collection.query.filter_by(user_id=current_user.id).all()

    if not favorite_collections:
        return jsonify({'message': 'You do not have any favorited collections yet!'})

    favorite_collections_list = []
    for favorite_collection in favorite_collections:
        collection = Collection.query.get(favorite_collection.collection_id)
        if collection:
            products = []
            for product in collection.products:
                products.append({
                    'id': product.id,
                    'brand_name': product.brand_name,
                    'product_name': product.product_name,
                    'product_type': product.product_type,
                    'description': product.description,
                    'key_ingredients': product.key_ingredients,
                    'product_link': product.product_link,
                    'preview_image': product.preview_image
                })
            fave_collection = {
                'id': favorite_collection.id,
                'user_id': current_user.id,
                'collection_id': favorite_collection.collection_id,
                'name': collection.name, 
                'products': products
            }
            favorite_collections_list.append(fave_collection)

    return jsonify({'FavoriteCollections': favorite_collections_list})



# Add a product to favorites
@user_routes.route('/current/favorites/products', methods=['POST'])
@login_required
def add_favorite_product():
    data = request.get_json()
    find_product = Product.query.filter_by(user_id=current_user.id).filter_by(id=data.get('product_id')).first()
    if not find_product:
        return {'message': 'Product could not be found'}, 404

    existing_favorite = Favorite_Product.query.filter_by(
        user_id=current_user.id, product_id=data.get('product_id')).first()
    if existing_favorite:
        return {'message': 'Product is already a favorite for this user'}, 400

    try:
        new_favorite_product = Favorite_Product(
            user_id=current_user.id,
            product_id=data.get('product_id')
        )
        db.session.add(new_favorite_product)
        db.session.commit()
        return new_favorite_product.to_dict(), 201
    except IntegrityError:
        db.session.rollback()
        return {'message': 'An error occurred while adding the product to favorites'}



# Add a collection to favorites
@user_routes.route('/current/favorites/collections', methods=['POST'])
@login_required
def add_favorite_collection():
    data = request.get_json()
    find_collection = Collection.query.filter_by(user_id=current_user.id).filter_by(id=data.get('collection_id'))

    if not find_collection:
        return {'message': 'Collection could not be found'}, 404

    existing_favorite = Favorite_Collection.query.filter_by(
        user_id=current_user.id, collection_id=data.get('collection_id')).first()
    if existing_favorite:
        return {'message': 'Collection is already a favorite for this user'}, 400

    try:
        new_favorite_collection = Favorite_Collection(
            user_id=current_user.id,
            collection_id=data.get('collection_id')
        )
        db.session.add(new_favorite_collection)
        db.session.commit()
        return new_favorite_collection.to_dict(), 201
    except IntegrityError:
        db.session.rollback()
        return {'message': 'An error occurred while adding the collection to favorites'}



# Remove a product from favorites
@user_routes.route('/current/favorites/products/<int:favorite_id>', methods=['DELETE'])
@login_required
def remove_favorite_product(favorite_id):
    current_product_favorite = Favorite_Product.query.filter_by(user_id=current_user.id).filter_by(
        id=favorite_id).first()

    if not current_product_favorite:
        return {'message': 'The selected product could not be deleted as it was not favorited'}, 404

    if current_user.id == current_product_favorite.user_id:
        db.session.delete(current_product_favorite)
        db.session.commit()
        return {'message': 'Successfully deleted.'}, 200
    else:
        return {'message': 'Forbidden'}, 403



# Remove a collection from favorites
@user_routes.route('/current/favorites/collections/<int:collection_id>', methods=['DELETE'])
@login_required
def remove_favorite_collection(collection_id):
    current_collection_favorite = Favorite_Collection.query.filter_by(user_id=current_user.id).filter_by(
    id=collection_id).first()

    if not current_collection_favorite:
        return {'message': 'The selected collection could not be deleted as it was not favorited'}, 404

    if current_user.id == current_collection_favorite.user_id:
        db.session.delete(current_collection_favorite)
        db.session.commit()
        return {'message': 'Successfully deleted.'}, 200
    else:
        return {'message': 'Forbidden'}, 403
