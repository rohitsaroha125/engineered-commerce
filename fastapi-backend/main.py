from fastapi import FastAPI
from pydantic import BaseModel, EmailStr
from routes.userRoutes import router as userRoutes

app = FastAPI()

class UserRegister(BaseModel):
    name: str | None = None
    email: EmailStr
    password: str

app.include_router(userRoutes)

@app.get("/")
async def hello():
    return {"message":"hello world"}

# @app.get("/{id}")
# async def getId(id: int, query: str | None = None):
#     return {"message": f"id is {id} query is {query}"}

# @app.post("/register")
# async def register(user: UserRegister):
#     return {"user": user}

# @app.put("/update/{user_id}")
# async def updateUser(user_id: int, user: UserRegister):
#     return {"user": user,"message": f"Updated {user_id}"}