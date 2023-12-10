"""create all tables

Revision ID: 4afb834c7e84
Revises: 46d48e5085bc
Create Date: 2023-12-10 03:07:42.829357

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '4afb834c7e84'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table('users',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('first_name', sa.String(length=15), nullable=False),
    sa.Column('last_name', sa.String(length=15), nullable=False),
    sa.Column('username', sa.String(length=15), nullable=False),
    sa.Column('email', sa.String(length=60), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('profile_image', sa.String(length=255), nullable=False),
    sa.Column('skin_type', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('username'),
    sa.UniqueConstraint('email')
    )
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table('products',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('brand_name', sa.String(length=60), nullable=False),
    sa.Column('product_name', sa.String(length=60), nullable=False),
    sa.Column('product_type', sa.String(length=60), nullable=False),
    sa.Column('description', sa.String(length=255), nullable=False),
    sa.Column('key_ingredients', sa.String(length=500), nullable=True),
    sa.Column('skin_concern', sa.String(length=255), nullable=False),
    sa.Column('product_link', sa.String(length=255), nullable=True),
    sa.Column('notes', sa.String(length=255), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('product_name'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")

    op.create_table('product_images',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('preview', sa.Boolean(server_default=False), nullable=False),
    sa.Column('image_url', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE product_images SET SCHEMA {SCHEMA};")

    op.create_table('collections',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('name', sa.String(length=60), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE collections SET SCHEMA {SCHEMA};")

    op.create_table('favorite_products',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE favorite_products SET SCHEMA {SCHEMA};")

    op.create_table('favorite_collections',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('collection_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('updated_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['collection_id'], ['collections.id'], ),
    )
    if environment == "production":
        op.execute(f"ALTER TABLE favorite_collections SET SCHEMA {SCHEMA};")


def downgrade():
    op.drop_table('favorite_collections')
    op.drop_table('favorite_products')
    op.drop_table('collections')
    op.drop_table('product_images')
    op.drop_table('products')
    op.drop_table('users')
