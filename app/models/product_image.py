from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Integer, String, Text, Column, Boolean, DateTime, ForeignKey
from datetime import datetime
# from flask_login import UserMixin


class Product_Image(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, autoincrement=True, primary_key=True)
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')))
    preview = Column(Boolean, nullable=False)
    image_url = Column(Text(500), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    products = db.relationship('Product', back_populates='product_images')

    def to_dict(self):
        return {
            'id': self.id,
            'product_id': self.product_id,
            'preview': self.preview,
            'image_url': self.image_url
        }
