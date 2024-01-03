from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection, Product, db
from app.forms.collection_form import CollectionForm

collections_routes = Blueprint('collections', __name__)

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
                          'preview_image': get_preview_image(product)
                          } for product in collection.products]
        }
        collections_list.append(collection_info)
    return jsonify({'Collections': collections_list})


def get_preview_image(product):
    preview_images = [
        {'image_url': image.image_url}
        for image in product.product_images
        if image.preview == True
    ]
    return preview_images


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
                        'skin_concern': product.skin_concern,
                        'product_link': product.product_link,
                        'user_id': product.user_id,
                        'preview_image': get_preview_image(product)
                        } for product in selected_collection.products]
    }
    return jsonify({'CollectionDetails': collection_info})


# Add a collection
@collections_routes.route('/', methods=['POST'])
@login_required
def add_collection():
    data = request.get_json()
    product_ids = data.get('product_ids', [])

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

    return new_collection.to_dict()



# Edit a collection by id
@collections_routes.route('/<int:collection_id>', methods=['PUT'])
@login_required
def edit_collection(collection_id):
    selected_collection = Collection.query.get(collection_id)

    if not selected_collection:
        return jsonify({'message': 'Collection does not exist'}), 404

    if selected_collection.user_id == current_user.id:
        modification = request.to_json()
        for [k, i] in modification.items():
            setattr(selected_collection, k, i)

            db.session.commit()
            return selected_collection.to_dict()
    else:
        return jsonify({'message': 'Forbidden'}), 403


# Delete a collection by id
@collections_routes.route('<int:collection_id>', methods=['DELETE'])
@login_required
def delete_collection(collection_id):
    selected_collection = Collection.query.get(collection_id)

    if not selected_collection:
        return jsonify({'message': 'Collection does not exist'}), 404

    if selected_collection.user_id == current_user.id:
        db.session.delete(selected_collection)
        db.session.commit()
        return jsonify({'message': 'Collection successfully deleted'}), 200
    else:
        return jsonify({'message': 'Forbidden'}), 403
