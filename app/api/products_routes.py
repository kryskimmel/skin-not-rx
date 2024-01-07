from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Product, Product_Image, db
from app.forms import ProductForm


product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


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
            'product_link': product.product_link,
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
        'product_link': selected_product.product_link,
        'user_id': selected_product.user_id,
        'Product_Images': [{'id': image.id, 'product_id': selected_product.id, 'preview': image.preview, 'image_url': image.image_url} for image in selected_product.product_images]
    }
    return jsonify({'ProductDetails': selected_product_with_images})



# Add a product
@product_routes.route('/', methods=['POST'])
@login_required
def add_product():

    data = request.get_json()
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_product = Product(
            brand_name=data.get('brand_name'),
            product_name=data.get('product_name'),
            product_type=data.get('product_type'),
            description=data.get('description'),
            key_ingredients=data.get('key_ingredients'),
            product_link=data.get('product_link'),
            user_id=current_user.id
        )
        db.session.add(new_product)
        db.session.commit()

        new_preview_image = Product_Image(
            product_id=new_product.id,
            preview=True,
            image_url=data.get('image_url')
        )
        db.session.add(new_preview_image)
        db.session.commit()

        new_product_with_preview_img = new_product.to_dict()
        new_product_with_preview_img["preview_image"] = data.get('image_url')

        return jsonify(new_product_with_preview_img), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400





# Edit a product by id
@product_routes.route('/<int:product_id>', methods=['PUT'])
@login_required
def edit_product(product_id):
    selected_product = Product.query.get(product_id)
    print("SELECTED PRODUCT-----", selected_product)

    if not selected_product:
        return jsonify({'message': 'Product does not exist'}), 404

    if selected_product.user_id == current_user.id:
        body = request.get_json()
        for [k, i] in body.items():
            setattr(selected_product, k, i)
        print('new selected Prod-----', selected_product)

        selected_product_with_img = {
        'id': selected_product.id,
        'brand_name': selected_product.brand_name,
        'product_name': selected_product.product_name,
        'product_type': selected_product.product_type,
        'preview_image': [product_img.image_url for product_img in selected_product.product_images if product_img.preview == True],
        'description': selected_product.description,
        'key_ingredients': selected_product.key_ingredients,
        'product_link': selected_product.product_link,
        'user_id': selected_product.user_id,
    }

        db.session.commit()
        return selected_product_with_img, 200
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
