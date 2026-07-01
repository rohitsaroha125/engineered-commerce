from fastapi import APIRouter, UploadFile, File, HTTPException, status
from sqlmodel import select

from models.product import Product
from utils.db import SessionDep

from utils.redis import redis_client

import json


router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get("/", status_code=status.HTTP_200_OK)
def get_products(
    session: SessionDep,
    page: int = 1,
    size: int = 10,
    search: str | None = None,
    category: int | None = None
):

    productPageKey = f"Products_Page_Size:{page}_{size}"

    value = redis_client.get(productPageKey)


    if value:
        print("Cache Hit")
        return {
            "ok": True,
            "products": json.loads(value)
        }

    print("Cache Miss")
    statement = select(Product)


    if search:
        statement = statement.where(
            Product.name.ilike(f"%{search}%")
        )


    if category:
        statement = statement.where(
            Product.categoryId == category
        )


    statement = (
        statement
        .offset((page * size) - size)
        .limit(size)
    )


    products = session.exec(statement).all()


    redis_client.set(
        productPageKey,
        json.dumps(
            [
                product.model_dump(mode="json")
                for product in products
            ]
        ),
        ex=300
    )


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