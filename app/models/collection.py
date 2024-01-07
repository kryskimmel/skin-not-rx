from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Integer, String, DateTime, Column, ForeignKey, Table, PrimaryKeyConstraint
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

class Collection(db.Model):
    __tablename__ = 'collections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, autoincrement=True, primary_key=True)
    name = Column(String(60), nullable=False)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='collections')
    products = db.relationship('Product', secondary='collection_product', back_populates='collections')
    favorite_collections = db.relationship('Favorite_Collection', back_populates='collections')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
        }
