from fastapi import FastAPI, APIRouter, HTTPException, status
from pydantic import EmailStr, BaseModel
from schemas.userSchema import UserRegister, UserLogin
from models.user import User
from utils.db import SessionDep

router = APIRouter()

@router.post("/user/register", status_code=status.HTTP_201_CREATED)
def register(session: SessionDep, user: UserRegister):
    db_user = User(**user.dict())
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user