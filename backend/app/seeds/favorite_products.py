from app.models import db, Favorite_Product, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.favorite_products_data import favorite_products_data

def seed_products():
    for favorite_product in favorite_products_data:
        seed_favorite_product = Favorite_Product(
            user_id=favorite_product['user_id'],
            product_id=favorite_product['product_id']
        )
        db.session.add(seed_favorite_product)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorite_products"))

    db.session.commit()