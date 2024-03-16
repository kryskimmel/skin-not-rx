from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy import Integer, DateTime, Column, ForeignKey, UniqueConstraint
from datetime import datetime
# from flask_login import UserMixin


class Favorite_Collection(db.Model):
    __tablename__ = 'favorite_collections'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = Column(Integer, autoincrement=True, primary_key=True)
    user_id = Column(Integer, ForeignKey(add_prefix_for_prod('users.id')))
    collection_id = Column(Integer, ForeignKey(add_prefix_for_prod('collections.id')))

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # RELATIONSHIPS
    user = db.relationship('User', back_populates='favorite_collections')
    collections = db.relationship('Collection', back_populates='favorite_collections')

    __table_args__ = (
       UniqueConstraint('user_id', 'collection_id', name='uq_user_collection_favorite'),
    )


    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'collection_id': self.collection_id,
        }
