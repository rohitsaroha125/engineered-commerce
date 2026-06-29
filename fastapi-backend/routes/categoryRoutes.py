from fastapi import FastAPI, APIRouter, HTTPException, status
from pydantic import EmailStr, BaseModel
from models.category import Category
from models.product import Product
from utils.db import SessionDep
from sqlmodel import select

router = APIRouter()

@router.get("/categories", status_code=status.HTTP_200_OK)
def getCategories(session: SessionDep):
    categories = session.exec(select(Category)).all()

    return {"ok": True, "categories": categories}

@router.get("/getProductsByCategory", status_code=status.HTTP_200_OK)
def getProductVyCategory(categoryId: int, session: SessionDep):
    products = session.exec(
        select(Product)
        .where(Product.categoryId == categoryId)
    ).all()
    return {"ok": True, "products": products}