from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Order(SQLModel, table=True):
    __tablename__ = "Order"

    id: Optional[int] = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="User.id")

    created_at: datetime = Field(default_factory=datetime.utcnow)

    updated_at: datetime = Field(default_factory=datetime.utcnow)

    user: Optional["User"] = Relationship(back_populates="orders")

    order_items: List["OrderItem"] = Relationship(back_populates="order")

    payments: List["Payment"] = Relationship(back_populates="order")