from fastapi import FastAPI, APIRouter
from pydantic import EmailStr, BaseModel
from schemas.userSchema import UserRegister, UserLogin

router = APIRouter()

@router.post("/user/register")
async def register(user: UserRegister):
    return {"user": user}