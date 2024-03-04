from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.products_data import products_data

def seed_products():
    for product in products_data:
        seed_product = Product(
            brand_name=product['brand_name'],
            product_name=product['product_name'],
            product_type=product['product_type'],
            description=product['description'],
            key_ingredients=product['key_ingredients'],
            product_link=product['product_link'],
            preview_image=product['preview_image'],
            user_id=product['user_id']
        )
        db.session.add(seed_product)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
