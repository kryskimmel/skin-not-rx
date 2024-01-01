from .db import db, SCHEMA
from sqlalchemy import Column, ForeignKey, Table, PrimaryKeyConstraint
from datetime import datetime


collection_product = Table(
    "collection_product",
    db.Model.metadata,
    Column("collection_id", ForeignKey("collections.id"), primary_key=True),
    Column("product_id", ForeignKey("products.id"), primary_key=True),
    PrimaryKeyConstraint("collection_id", "product_id"),
    extend_existing=True
)
