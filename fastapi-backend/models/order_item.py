from typing import Optional

from sqlmodel import Field, Relationship, SQLModel


class OrderItem(SQLModel, table=True):
    __tablename__ = "OrderItems"

    id: Optional[int] = Field(default=None, primary_key=True)

    product_id: int = Field(foreign_key="Product.id")

    order_id: int = Field(foreign_key="Order.id")

    qty: int

    product: Optional["Product"] = Relationship(back_populates="order_items")

    order: Optional["Order"] = Relationship(back_populates="order_items")