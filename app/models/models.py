from .db import db, environment, SCHEMA, add_prefix_for_prod
from .tables import product_collections, favorited_products, favorited_collections
import sqlalchemy as sa
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

# ### USER model ###
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    first_name = sa.Column(sa.String(20), nullable=False)
    last_name = sa.Column(sa.String(20), nullable=False)
    username = sa.Column(sa.String(20), unique=True, nullable=False)
    email = sa.Column(sa.String(20), unique=True, nullable=False)
    hashed_password = sa.Column(sa.String(255), nullable=False)
    profile_image = sa.Column(sa.String(500), nullable=False)
    skin_type = sa.Column(sa.String(255), nullable=False)
    created_at = sa.Column(sa.DateTime, default=datetime.now())
    updated_at = sa.Column(sa.DateTime, default=datetime.now(), onupdate=datetime.now())

    # one-to-many rel
    products = db.relationship('Product', back_populates='user', cascade='all, delete-orphan')
    collections = db.relationship('Collection', back_populates='user', cascade='all, delete-orphan')

    #many-to-many rel
    favorite_products = db.relationship('Product', 
                                        secondary=favorited_products, 
                                        back_populates='user', 
                                        primaryjoin="User.id == favorited_products.c.user_id")
    favorite_collections = db.relationship('Collection', 
                                           secondary=favorited_collections, 
                                           back_populates='user', 
                                           primaryjoin="User.id == favorited_collections.c.user_id")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email,
            'profile_image': self.profile_image,
            'skin_type': self.skin_type
        }
    

# ### PRODUCT model ###
class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    brand_name = sa.Column(sa.String(60), nullable=False)
    product_name = sa.Column(sa.String(60), unique=True, nullable=False)
    product_type = sa.Column(sa.String(500), nullable=False)
    description = sa.Column(sa.String(500), nullable=False)
    key_ingredients = sa.Column(sa.String(500), nullable=True)
    product_link = sa.Column(sa.String(500), nullable=True)
    preview_image = sa.Column(sa.String(500), nullable=False)
    user_id = sa.Column(sa.Integer, sa.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = sa.Column(sa.DateTime, default=datetime.now())
    updated_at = sa.Column(sa.DateTime, default=datetime.now(), onupdate=datetime.now())
    #many products belong to a user
    user = db.relationship('User', back_populates='products')
    #many-to-many rel
    collections = db.relationship('Collection', 
                                  secondary=product_collections, 
                                  back_populates='products',
                                  primaryjoin="Product.id == product_collections.c.product_id")
    def to_dict(self):
        return {
            'id': self.id,
            'brand_name': self.brand_name,
            'product_name': self.product_name,
            'product_type': self.product_type,
            'description': self.description,
            'key_ingredients': self.key_ingredients,
            'product_link': self.product_link,
            'preview_image': self.preview_image,
            'user_id': self.user_id
        }


# ### COLLECTION model ###
class Collection(db.Model):
    __tablename__ = 'collections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    name = sa.Column(sa.String(20), nullable=False)
    user_id = sa.Column(sa.Integer, sa.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = sa.Column(sa.DateTime, default=datetime.now())
    updated_at = sa.Column(sa.DateTime, default=datetime.now(), onupdate=datetime.now())
    #many collections belong to a user
    user = db.relationship('User', back_populates='collections')
    #many-to-many rel
    products = db.relationship('Product', 
                               secondary=product_collections, 
                               back_populates='collections',
                               primaryjoin="and_(Collection.id == product_collections.c.collection_id)")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'user_id': self.user_id,
        }
    

# ### FAVORITE_PRODUCT model ###
class Favorite_Product(db.Model):
    __tablename__ = 'favorite_products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    user_id = sa.Column(sa.Integer, sa.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = sa.Column(sa.Integer, sa.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    created_at = sa.Column(sa.DateTime, default=datetime.now())
    updated_at = sa.Column(sa.DateTime, default=datetime.now(), onupdate=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_id': self.product_id,
        }
    

 # ### FAVORITE_COLLECTION model ###
class Favorite_Collection(db.Model):
    __tablename__ = 'favorite_collections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = sa.Column(sa.Integer, primary_key=True, autoincrement=True)
    user_id = sa.Column(sa.Integer, sa.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    collection_id = sa.Column(sa.Integer, sa.ForeignKey(add_prefix_for_prod('collections.id')), nullable=False)
    created_at = sa.Column(sa.DateTime, default=datetime.now())
    updated_at = sa.Column(sa.DateTime, default=datetime.now(), onupdate=datetime.now())

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'collection_id': self.collection_id,
        }
