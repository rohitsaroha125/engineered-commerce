from typing import Annotated, Generator
from sqlmodel import Session, create_engine
from fastapi import Depends
from dotenv import load_dotenv
import models
import os

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL") or "sqlite:///./test.db"
engine = create_engine(DATABASE_URL, echo=True)

def get_session() -> Generator[Session, None, None]:
    with Session(engine) as session:
        yield session

# Annotated dependency you can import in routes
SessionDep = Annotated[Session, Depends(get_session)]