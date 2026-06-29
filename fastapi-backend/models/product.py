from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Product(SQLModel, table=True):
    __tablename__ = "Product"

    id: Optional[int] = Field(default=None, primary_key=True)

    name: str

    price: int

    categoryId: int = Field(foreign_key="Category.id")

    image: Optional[str] = None

    createdAt: datetime = Field(default_factory=datetime.utcnow)

    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    category: Optional["Category"] = Relationship(back_populates="products")

    order_items: List["OrderItem"] = Relationship(back_populates="product")