from .db import db, environment, SCHEMA, add_prefix_for_prod
from db import Column, Integer, String, Boolean, ForeignKey, DateTime
from datetime import datetime
# from flask_login import UserMixin


class Favorite_Product(db.Model):
    __tablename__ = 'favorite_products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')))

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
        }
