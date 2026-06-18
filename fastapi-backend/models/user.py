from sqlmodel import Field, Session, SQLModel, create_engine, select

class User(SQLModel, table=True):
    __tablename__ = "User"
    
    id: int = Field(primary_key=True)
    name: str = Field(index=True)
    email: str = Field(index=True, unique=True)
    password: str