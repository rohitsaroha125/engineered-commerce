from datetime import datetime
from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Category(SQLModel, table=True):
    __tablename__ = "Category"

    id: Optional[int] = Field(default=None, primary_key=True)

    name: str = Field(unique=True)

    createdAt: datetime = Field(default_factory=datetime.utcnow)

    updatedAt: datetime = Field(default_factory=datetime.utcnow)

    products: List["Product"] = Relationship(back_populates="category")