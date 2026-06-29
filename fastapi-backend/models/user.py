from sqlmodel import Field, Session, SQLModel, create_engine, select, Relationship
from typing import List, Optional

class User(SQLModel, table=True):
    __tablename__ = "User"
    
    id: int = Field(primary_key=True)
    name: str = Field(index=True)
    email: str = Field(index=True, unique=True)
    password: str

    orders: List["Order"] = Relationship(back_populates="user")