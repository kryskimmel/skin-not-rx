from app.models import db, Collection, environment, SCHEMA
from sqlalchemy.sql import text
from .seed_data.collections_data import collections_data

def seed_collections():
    for collection in collections_data:
        seed_collection = Collection(
            name=collection['name'],
            user_id=collection['user_id'],
            product_id=collection['product_id']
        )
        db.session.add(seed_collection)
    db.session.commit()


def undo_collections():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.collections RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM collections"))

    db.session.commit()
