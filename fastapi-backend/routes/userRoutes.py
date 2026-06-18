from fastapi import FastAPI, APIRouter, HTTPException, status
from pydantic import EmailStr, BaseModel
from schemas.userSchema import UserRegister, UserLogin
from models.user import User
from utils.db import SessionDep
from utils.passwordHashing import get_password_hash, verify_password
from sqlmodel import select

router = APIRouter()

@router.post("/user/register", status_code=status.HTTP_201_CREATED)
def register(session: SessionDep, user: UserRegister):
    try:
        new_password = get_password_hash(user.password)
        new_user = {"name":user.name, "email": user.email, "password": new_password}
        db_user = User(**new_user)
        session.add(db_user)
        session.commit()
        session.refresh(db_user)
        return db_user
    except:
        raise HTTPException(status_code=500, detail="Something Went Wrong")

@router.post("/user/login", status_code=status.HTTP_200_OK)
def login(session: SessionDep, user: UserLogin):
    db_user = session.exec(select(User).where(User.email==user.email)).first()
    print(db_user)
    if not db_user:
        raise HTTPException(status_code=401, detail="Email Not Found")

    password_match = verify_password(user.password, db_user.password)
    if not password_match:
        raise HTTPException(status_code=401, detail="Wrong Password")

    return db_user