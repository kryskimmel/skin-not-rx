from .db import db, environment, SCHEMA, add_prefix_for_prod
from db import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
# from flask_login import UserMixin


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    brand_name = Column(String(50), nullable=False)
    product_name = Column(String(50), nullable=False, unique=True)
    product_type = Column(String(50), nullable=False)
    description = Column(String(255), nullable=False)
    ingredients = Column(String(255), nullable=False)
    skin_concern = Column(String(50), nullable=False)
    product_link = Column(String(255), nullable=True)
    notes = Column(String(255), nullable=True)

    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS

    def to_dict(self):
        return {
            'id': self.id,
            'brand_name': self.brand_name,
            'product_name': self.product_name,
            'product_type': self.product_type,
            'description': self.description,
            'ingredients': self.ingredients,
            'product_link': self.product_link,
            'notes': self.notes,
            'user_id': self.user_id
        }
