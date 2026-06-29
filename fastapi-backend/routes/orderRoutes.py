from fastapi import APIRouter, UploadFile, File, HTTPException, status
from sqlmodel import select
from models.order_item import OrderItem
from models.order import Order
from schemas.orderSchema import OrderSchema
from utils.db import SessionDep

router = APIRouter(
    prefix: "/orders",
    tags: ["orders"]
)

@router.post("/add", status_code=status.HTTP_201_CREATED)
def addOrder(items: List[OrderSchema], session: SessionDep):
    