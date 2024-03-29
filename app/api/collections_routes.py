from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection, Product, db, Favorite_Collection
from app.forms import CollectionForm
from sqlalchemy.exc import IntegrityError


collections_routes = Blueprint('collections', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# Get all collections (Explore page)
@collections_routes.route('/', methods=['GET'])
def explore_collections():
    all_collections = Collection.query.all()
    collections_list = []

    for collection in all_collections:
        collection_info = {
            'id': collection.id,
            'name': collection.name,
            'user_id': collection.user_id,
            'Products': [{'id':product.id,
                          'brand_name':product.brand_name,
                          'product_name':product.product_name,
                          'preview_image': product.preview_image
                          } for product in collection.products]
        }
        collections_list.append(collection_info)
    return jsonify({'Collections': collections_list})


# Get a collection's details
@collections_routes.route('/<int:collection_id>', methods=['GET'])
def get_collection_details(collection_id):
    selected_collection = Collection.query.get(collection_id)

    if not selected_collection:
         return jsonify({'message': 'Collection does not exist'}), 404

    collection_info = {
        'id': selected_collection.id,
        'name': selected_collection.name,
        'user_id': selected_collection.user_id,
        'Products': [{  'id':product.id,
                        'brand_name':product.brand_name,
                        'product_name':product.product_name,
                        'product_type': product.product_type,
                        'description': product.description,
                        'key_ingredients': product.key_ingredients,
                        'product_link': product.product_link,
                        'user_id': product.user_id,
                        'preview_image': product.preview_image
                        } for product in selected_collection.products]
    }
    return jsonify({'CollectionDetails': collection_info})


# Add a collection
@collections_routes.route('/', methods=['POST'])
@login_required
def add_collection():
    data = request.get_json()
    form = CollectionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    product_ids = data.get('product_ids', [])

    if form.validate_on_submit():
        new_collection = Collection(
            name=data.get('name'),
            user_id=current_user.id,
        )

        for product_id in product_ids:
            product = Product.query.get(product_id)

            if product:
                new_collection.products.append(product)

        db.session.add(new_collection)
        db.session.commit()


        new_collection_with_products_info = new_collection.to_dict()

        new_collection_with_products_info['Products'] = [
                    {  'id':product.id,
                        'brand_name':product.brand_name,
                        'product_name':product.product_name,
                        'product_type': product.product_type,
                        'description': product.description,
                        'key_ingredients': product.key_ingredients,
                        'product_link': product.product_link,
                        'user_id': product.user_id,
                        'preview_image': product.preview_image
                        } for product in new_collection.products]

        return new_collection_with_products_info, 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400



# Edit a collection by id
@collections_routes.route('/<int:collection_id>', methods=['PUT'])
@login_required
def edit_collection(collection_id):

    selected_collection = Collection.query.get(collection_id)

    if not selected_collection:
        return jsonify({'message': 'Collection does not exist'}), 404

    if selected_collection.user_id == current_user.id:
        body = request.get_json()
        updated_name = body['name']
        updated_product_ids = body['product_ids']

        if updated_name:
            selected_collection.name = updated_name

        products = []

        for id in updated_product_ids:
            product = Product.query.get(id)
            products.append(product)

        selected_collection.products = products

        db.session.commit()

        updated_collection = selected_collection.to_dict()
        updated_collection['Products'] = [
               {  'id':product.id,
                        'brand_name':product.brand_name,
                        'product_name':product.product_name,
                        'product_type': product.product_type,
                        'description': product.description,
                        'key_ingredients': product.key_ingredients,
                        'product_link': product.product_link,
                        'user_id': product.user_id,
                        'preview_image': product.preview_image
                } for product in selected_collection.products]

        return updated_collection, 201
    else:
        return jsonify({'message': 'Forbidden'}), 403



# Delete a collection by id
@collections_routes.route('/<int:collection_id>', methods=['DELETE'])
@login_required
def delete_collection(collection_id):
    selected_collection = Collection.query.get(collection_id)

    if not selected_collection:
        return jsonify({'message': 'Collection does not exist'}), 404

    if selected_collection.user_id != current_user.id:
        return jsonify({'message': 'Forbidden'}), 403

    try:
        Favorite_Collection.query.filter_by(collection_id=collection_id).delete()
        db.session.delete(selected_collection)
        db.session.commit()
        
        return jsonify({'message': 'Your collection was successfully deleted'}), 200
    except IntegrityError:
        db.session.rollback()
        return jsonify({'message': 'Failed to delete collection'}), 500