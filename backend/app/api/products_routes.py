from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Product, db
from app.forms import ProductForm
from app.awsS3 import upload_file_to_s3, get_unique_filename, allowed_file

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
            'description': product.description,
            'key_ingredients': product.key_ingredients,
            'product_link': product.product_link,
            'preview_image': product.preview_image,
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
        'description': selected_product.description,
        'key_ingredients': selected_product.key_ingredients,
        'product_link': selected_product.product_link,
        'preview_image': selected_product.preview_image,
        'user_id': selected_product.user_id,
    }
    return jsonify({'ProductDetails': selected_product_with_images})



# Add a product
@product_routes.route('/', methods=['POST'])
@login_required
def add_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    try:
        if form.validate_on_submit():
            if "image_url" in request.files:
                image_url = request.files["image_url"]
                if not allowed_file(image_url.filename):
                    return {"errors": ["Image file type not permitted"]}, 400

                image_url.filename = get_unique_filename(image_url.filename)
                upload = upload_file_to_s3(image_url)
                if "url" not in upload:
                    return upload, 400
                url = upload["url"]
            else:
                url = None

            new_product = Product(
                brand_name=form.data['brand_name'],
                product_name=form.data['product_name'],
                product_type=form.data['product_type'],
                description=form.data['description'],
                key_ingredients=form.data['key_ingredients'],
                product_link=form.data['product_link'],
                preview_image=url,
                user_id=current_user.id
            )

            db.session.add(new_product)
            db.session.commit()

            return jsonify(new_product.to_dict()), 201
    except Exception as e:
        print('error------', str(e))
        return {'error': str(e)}, 500
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
        'preview_image': selected_product.preview_image,
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