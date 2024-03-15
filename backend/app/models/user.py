from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Integer, String, Text, Column, DateTime
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, autoincrement=True, primary_key=True)
    first_name = Column(String(20), nullable=False)
    last_name = Column(String(20), nullable=False)
    username = Column(String(20), nullable=False, unique=True)
    email = Column(String(20), nullable=False, unique=True)
    hashed_password = Column(String(255), nullable=False)
    profile_image = Column(String(500), nullable=False)
    skin_type = Column(String(255), nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    products = db.relationship('Product', back_populates='user')
    favorite_products = db.relationship('Favorite_Product', back_populates='user')
    collections = db.relationship('Collection', back_populates='user')
    favorite_collections = db.relationship('Favorite_Collection', back_populates='user')

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