from fastapi import APIRouter, UploadFile, File, HTTPException, status
from sqlmodel import select

from models.product import Product
from utils.db import SessionDep

import json


router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


# GET ALL PRODUCTS
@router.get("/", status_code=status.HTTP_200_OK)
def get_products(
    session: SessionDep,
    page: int = 1,
    size: int = 10,
    search: str | None = None,
    category: int | None = None
):

    statement = select(Product)


    # search filter
    if search:
        statement = statement.where(
            Product.name.ilike(f"%{search}%")
        )


    # category filter
    if category:
        statement = statement.where(
            Product.categoryId == category
        )


    # pagination
    statement = (
        statement
        .offset((page * size) - size)
        .limit(size)
    )


    products = session.exec(statement).all()


    return {
        "ok": True,
        "products": products
    }

@router.get("/{id}", status_code=status.HTTP_200_OK)
def single_product(
    id:int,
    session:SessionDep
):

    product = session.get(Product,id)


    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )


    return {
        "ok":True,
        "product":product
    }