from .db import db, environment, SCHEMA, add_prefix_for_prod
import sqlalchemy as sa
from datetime import datetime


product_collections = db.Table(
    'product_collections',
    sa.Column('product_id', sa.Integer, sa.ForeignKey('products.id'), primary_key=True),
    sa.Column('collection_id', sa.Integer, sa.ForeignKey('collections.id'), primary_key=True)
)

favorited_products = db.Table(
    'favorited_products',
    sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), primary_key=True),
    sa.Column('product_id', sa.Integer, sa.ForeignKey('products.id'), primary_key=True)
)

favorited_collections = db.Table(
    'favorited_collections',
    sa.Column('user_id', sa.Integer, sa.ForeignKey('users.id'), primary_key=True),
    sa.Column('collection_id', sa.Integer, sa.ForeignKey('collections.id'), primary_key=True)
)