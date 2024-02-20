from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Integer, Column, DateTime, ForeignKey
from datetime import datetime
# from flask_login import UserMixin


class Favorite_Product(db.Model):
    __tablename__ = 'favorite_products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')))

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='favorite_products')
    products = db.relationship('Product', back_populates='favorite_products')


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
        }
