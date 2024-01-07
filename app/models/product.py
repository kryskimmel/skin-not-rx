from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Integer, String, Text, DateTime, Column, ForeignKey, Table, PrimaryKeyConstraint
from datetime import datetime
# from flask_login import UserMixin

collection_product = Table(
    "collection_product",
    db.Model.metadata,
    Column("collection_id", ForeignKey(add_prefix_for_prod("collections.id")), primary_key=True),
    Column("product_id", ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
    PrimaryKeyConstraint("collection_id", "product_id"),
    extend_existing=True
)


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = Column(Integer, autoincrement=True, primary_key=True)
    brand_name = Column(String(60), nullable=False)
    product_name = Column(String(60), nullable=False, unique=True)
    product_type = Column(String(60), nullable=False)
    description = Column(String(500), nullable=False)
    key_ingredients = Column(String(500), nullable=True)
    product_link = Column(String(500), nullable=True)

    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='products')
    product_images = db.relationship('Product_Image', back_populates='products', cascade='all, delete-orphan')
    favorite_products = db.relationship('Favorite_Product', back_populates='products', cascade='all, delete-orphan')
    collections = db.relationship('Collection', secondary='collection_product', back_populates='products')

    def to_dict(self):
        return {
            'id': self.id,
            'brand_name': self.brand_name,
            'product_name': self.product_name,
            'product_type': self.product_type,
            'description': self.description,
            'key_ingredients': self.key_ingredients,
            'product_link': self.product_link,
            'user_id': self.user_id
        }
