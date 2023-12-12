from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product

product_routes = Blueprint('products', __name__)


@product_routes.route('/explore', methods=['GET'])
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
