from .db import db, environment, SCHEMA, add_prefix_for_prod
import sqlalchemy as sa
from datetime import datetime



product_collections = db.Table(
    'product_collections',
    db.metadata,
    sa.Column('product_id', sa.Integer, sa.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True),
    sa.Column('collection_id', sa.Integer, sa.ForeignKey(add_prefix_for_prod('collections.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

favorited_products = db.Table(
    'favorited_products',
    db.metadata,
    sa.Column('user_id', sa.Integer, sa.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    sa.Column('product_id', sa.Integer, sa.ForeignKey(add_prefix_for_prod('products.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)

favorited_collections = db.Table(
    'favorited_collections',
    db.metadata,
    sa.Column('user_id', sa.Integer, sa.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True),
    sa.Column('collection_id', sa.Integer, sa.ForeignKey(add_prefix_for_prod('collections.id')), primary_key=True),
    schema=SCHEMA if environment == "production" else None
)