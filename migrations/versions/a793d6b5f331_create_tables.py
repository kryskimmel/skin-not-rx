"""create tables

Revision ID: a793d6b5f331
Revises: 
Create Date: 2024-03-20 16:44:42.569481

"""
from alembic import op
import sqlalchemy as sa
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'a793d6b5f331'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('first_name', sa.String(length=20), nullable=False),
        sa.Column('last_name', sa.String(length=20), nullable=False),
        sa.Column('username', sa.String(length=20), unique=True, nullable=False),
        sa.Column('email', sa.String(length=20), unique=True, nullable=False),
        sa.Column('hashed_password', sa.String(length=255), nullable=False),
        sa.Column('profile_image', sa.String(length=500), nullable=False),
        sa.Column('skin_type', sa.String(length=255), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
    )
    op.create_table(
        'products',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('brand_name', sa.String(length=60), nullable=False),
        sa.Column('product_name', sa.String(length=60), unique=True, nullable=False),
        sa.Column('product_type', sa.String(length=500), nullable=False),
        sa.Column('description', sa.String(length=500), nullable=False),
        sa.Column('key_ingredients', sa.String(length=500), nullable=True),
        sa.Column('product_link', sa.String(length=500), nullable=True),
        sa.Column('preview_image', sa.String(length=500), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'],),
    )
    op.create_table(
        'collections',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('name', sa.String(length=20), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'],),
    )
    op.create_table(
        'product_collections',
        sa.Column('product_id', sa.Integer(), sa.ForeignKey('products.id'), primary_key=True),
        sa.Column('collection_id', sa.Integer(), sa.ForeignKey('collections.id'), primary_key=True)
    )
    op.create_table('favorite_products',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('product_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    )
    op.create_table('favorite_collections',
        sa.Column('id', sa.Integer(), primary_key=True, autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('collection_id', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True),
        sa.ForeignKeyConstraint(['collection_id'], ['collections.id'], ),
        sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE collections SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE product_collections SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE favorite_products SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE favorite_collections SET SCHEMA {SCHEMA};")

def downgrade() -> None:
    op.drop_table('favorite_collections')
    op.drop_table('favorite_products')
    op.drop_table('product_collections')
    op.drop_table('collections')
    op.drop_table('products')
    op.drop_table('users')
