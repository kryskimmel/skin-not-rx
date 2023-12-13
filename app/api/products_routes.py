from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Product, Product_Image, db

product_routes = Blueprint('products', __name__)

# Get all products (Explore page)
@product_routes.route('/explore', methods=['GET'])
@login_required
def explore_products():
    all_products = Product.query.all()
    products_list = []

    for product in all_products:
        product_info = {
            'brand_name': product.brand_name,
            'product_name': product.product_name,
            'product_type': product.product_type,
            'description': product.description,
            'key_ingredients': product.key_ingredients,
            'skin_concern': product.skin_concern,
            'product_link': product.product_link,
            'notes': product.notes,
            'user_id': product.user_id,
            'Product_Images': [{'id': image.id, 'product_id': product.id, 'preview': image.preview, 'image_url': image.image_url} for image in product.product_images]
        }
        products_list.append(product_info)
    return jsonify({'Products': products_list})

# Add a product
@product_routes.route('/', methods=['POST'])
def add_product():
    data = request.get_json()
    new_product = Product(
        brand_name=data.get('brand_name'),
        product_name=data.get('product_name'),
        product_type=data.get('product_type'),
        description=data.get('description'),
        key_ingredients=data.get('key_ingredients'),
        skin_conern=data.get('skin_concern'),
        product_link=data.get('product_link'),
        notes=data.get('notes'),
        user_id=current_user.id
    )
    db.session.add(new_product)
    db.session.commit()

    newPreviewImage = Product_Image(
        product_id=new_product.id,
        preview=data.get('preview'),
        image_url=data.get('image_url')
    )
    db.session.add(newPreviewImage)
    db.session.commit()

    product_and_product_img=new_product.to_dict()
    return jsonify(product_and_product_img)


# Edit a product by id
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    selected_product = Product.query.get(product_id)

    if not selected_product:
        return jsonify({'message': 'Product does not exist'}), 404

    if selected_product.user_id == current_user.id:
        modification = request.to_json()
        for [k, i] in modification.items():
            setattr(selected_product, k, i)

            db.session.commit()
            return selected_product.to_dict()
    else:
        return jsonify({'message': 'Forbidden'}), 403


# Delete a product by id
@product_routes.route('/<int:product_id>', methods=['DELETE'])
@login_required
def delete_product(product_id):
    selected_product = Product.query.get(product_id)

    if not selected_product:
        return jsonify({'message': 'Product does not exist'}), 404

    if selected_product.user_id == current_user.id:
        db.session.delete(selected_product)
        db.seesion.commit()
        return jsonify({'message': 'Product successfully deleted'}), 200
    else:
        return jsonify({'message': 'Forbidden'}), 403