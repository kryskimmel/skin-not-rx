from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Collection, db

collections_routes = Blueprint('collections', __name__)

# Get all collections (Explore page)
@collections_routes.route('/explore', methods=['GET'])
def explore_collections():
    all_collections = Collection.query.all()
    collections_list = []

    for collection in all_collections:
        collection_info = {
            'name': collection.name,
            'user_id': collection.user_id,
            'product_id': collection.product_id,
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
        'name': selected_collection.name,
        'user_id': selected_collection.user_id,
        'product_id': selected_collection.product_id,
    }
    return jsonify({'Collection Details': collection_info})


# Add a collection
@collections_routes.route('/', methods=['POST'])
@login_required
def add_collection():
    data = request.get_json()
    new_collection = Collection(
        name=data.get('name'),
        user_id=data.get('user_id'),
        product_id=data.get('product_id'),
    )
    db.session.add(new_collection)
    db.session.commit()
    return jsonify(new_collection)


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
        db.seesion.commit()
        return jsonify({'message': 'Collection successfully deleted'}), 200
    else:
        return jsonify({'message': 'Forbidden'}), 403
