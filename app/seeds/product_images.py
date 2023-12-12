from app.models import db, Product_Image, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.product_images_data import product_images_data

def seed_product_images():
    for product_image in product_images_data:
        seed_product_image = Product_Image(
            product_id=product_image['product_id'],
            preview=product_image['preview'],
            image_url=product_image['image_url']
        )
        db.session.add(seed_product_image)
    db.session.commit()

def undo_product_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM product_images"))

    db.session.commit()
