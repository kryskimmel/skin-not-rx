from sqlalchemy.ext.declarative import declarative_base
from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey, Table, PrimaryKeyConstraint
from datetime import datetime

# Base = declarative_base()

collection_product = Table(
    "collection_product",
    db.Model.metadata,
    Column("collection_id", ForeignKey(add_prefix_for_prod("collections.id")), primary_key=True),
    Column("product_id", ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
    PrimaryKeyConstraint("collection_id", "product_id"),
    # extend_existing=True
)
if environment == "production":
    collection_product.schema = SCHEMA


# class Collection_Product(db.Model):
#     __tablename__ = 'collection_product'

#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, autoincrement=True, primary_key=True)
#     collection_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("collections.id")), nullable=False)
#     product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")), nullable=False)

#     # Relationships
#     collections = db.relationship('Collection', back_populates='collection_product', foreign_keys=[collection_id])
#     products = db.relationship('Product', back_populates='collection_product', foreign_keys=[product_id])
