from app.models import db, Favorite_Collection, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.favorite_collections_data import favorite_collections_data

def seed_favorite_collections():
    for favorite_collection in favorite_collections_data:
        seed_favorite_collection = Favorite_Collection(
            user_id=favorite_collection['user_id'],
            collection_id=favorite_collection['collection_id']
        )
        db.session.add(seed_favorite_collection)
    db.session.commit()


def undo_favorite_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorite_collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM favorite_collections"))

    db.session.commit()