from .db import db, SCHEMA, add_prefix_for_prod
from sqlalchemy import Column, ForeignKey, Table, PrimaryKeyConstraint
from datetime import datetime

collection_product = Table(
    "collection_product",
    db.Model.metadata,
    Column("collection_id", ForeignKey(add_prefix_for_prod("collections.id")), primary_key=True),
    Column("product_id", ForeignKey(add_prefix_for_prod("products.id")), primary_key=True),
    PrimaryKeyConstraint("collection_id", "product_id"),
    extend_existing=True
)
