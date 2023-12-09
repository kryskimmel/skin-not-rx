from .db import db, environment, SCHEMA, add_prefix_for_prod
from db import Column, Integer, String, ForeignKey, DateTime
from datetime import datetime
# from flask_login import UserMixin


class Collection(db.Model):
    __tablename__ = 'collections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    product_id = Column(Integer, ForeignKey(add_prefix_for_prod('products.id')))

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
            'product_id': self.product_id,
        }
