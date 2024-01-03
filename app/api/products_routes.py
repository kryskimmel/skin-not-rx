from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Product, Product_Image, db


product_routes = Blueprint('products', __name__)


# Get all products (Explore page)
@product_routes.route('/', methods=['GET'])
def explore_products():
    all_products = Product.query.all()
    products_list = []

    for product in all_products:
        product_info = {
            'id': product.id,
            'brand_name': product.brand_name,
            'product_name': product.product_name,
            'product_type': product.product_type,
            'preview_image': [product_img.image_url for product_img in product.product_images if product_img.preview == True],
            'description': product.description,
            'key_ingredients': product.key_ingredients,
            'skin_concern': product.skin_concern,
            'product_link': product.product_link,
            'notes': product.notes,
            'user_id': product.user_id,
        }
        products_list.append(product_info)
    return jsonify({'Products': products_list})



# Get a product's details
@product_routes.route('/<int:product_id>', methods=['GET'])
def get_product_details(product_id):
    selected_product = Product.query.get(product_id)

    if not selected_product:
         return jsonify({'message': 'Product does not exist'}), 404

    selected_product_with_images = {
        'id': selected_product.id,
        'brand_name': selected_product.brand_name,
        'product_name': selected_product.product_name,
        'product_type': selected_product.product_type,
        'preview_image': [product_img.image_url for product_img in selected_product.product_images if product_img.preview == True],
        'description': selected_product.description,
        'key_ingredients': selected_product.key_ingredients,
        'skin_concern': selected_product.skin_concern,
        'product_link': selected_product.product_link,
        'notes': selected_product.notes,
        'user_id': selected_product.user_id,
        'Product_Images': [{'id': image.id, 'product_id': selected_product.id, 'preview': image.preview, 'image_url': image.image_url} for image in selected_product.product_images]
    }
    return jsonify({'ProductDetails': selected_product_with_images})



# Add a product
@product_routes.route('/', methods=['POST'])
@login_required
def add_product():
    data = request.get_json()
    new_product = Product(
        brand_name=data.get('brand_name'),
        product_name=data.get('product_name'),
        product_type=data.get('product_type'),
        description=data.get('description'),
        key_ingredients=data.get('key_ingredients'),
        skin_concern=data.get('skin_concern'),
        product_link=data.get('product_link'),
        notes=data.get('notes'),
        user_id=current_user.id
    )
    db.session.add(new_product)
    db.session.commit()

    new_product_dict = {
        'id': new_product.id,
        'brand_name': new_product.brand_name,
        'product_name': new_product.product_name,
        'product_type': new_product.product_type,
        'description': new_product.description,
        'key_ingredients': new_product.key_ingredients,
        'skin_concern': new_product.skin_concern,
        'product_link': new_product.product_link,
        'notes': new_product.notes,
        'user_id': new_product.user_id
    }
    return jsonify(new_product_dict)

    # newPreviewImage = Product_Image(
    #     product_id=new_product.id,
    #     preview=data.get('preview'),
    #     image_url=data.get('image_url')
    # )
    # db.session.add(newPreviewImage)
    # db.session.commit()

    # product_and_product_img=new_product.to_dict()
    # return jsonify(product_and_product_img)



# Edit a product by id
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    selected_product = Product.query.get(product_id)

    if not selected_product:
        return jsonify({'message': 'Product does not exist'}), 404

    if selected_product.user_id == current_user.id:
        modification = request.get_json()
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
        db.session.commit()
        return jsonify({'message': 'Product successfully deleted'}), 200
    else:
        return jsonify({'message': 'Forbidden'}), 403


# Add a product image
@product_routes.route('/<int:product_id>/images', methods=['POST'])
@login_required
def add_product_image(product_id):
    find_product = Product.query.get(product_id)

    if not find_product:
        return jsonify({'message': 'Product does not exist'}), 404

    if find_product.user_id == current_user.id:
        extractData = request.get_data

        if extractData.get('preview') == True:
            current_product_images = Product_Image.query.filter_by(product_id = product_id).all()
            for image in current_product_images:
                if image.preview == True:
                    image.preview = False
            db.session.commit()

        add_new_preview = Product_Image(
            image_url=extractData.get('image_url'),
            preview=extractData.get('preview'),
            product_id=product_id
        )
        db.session.add(add_new_preview)
        db.session.commit()
        return add_new_preview.to_dict()
    else:
        return jsonify({'message': 'Forbidden'}), 403

# Delete a product image
@product_routes.route('/<int:product_id>/images/<int:product_image_id>', methods=['DELETE'])
@login_required
def delete_product_image(product_id, product_image_id):
    find_product = Product.query.get(product_id)
    product_images = find_product.product_images

    if not find_product:
        return jsonify({'message': 'Product does not exist'}), 404

    if find_product.user_id == current_user.id:
        for image in product_images:
            if image.id == product_image_id:
                db.session.delete(image)
                db.session.commit()
                return jsonify({'message': 'Product image deleted successfully'}), 200
    else:
        return jsonify({'message': 'Forbidden'}), 403
