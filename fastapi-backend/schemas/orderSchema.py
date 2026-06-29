from pydantic import BaseModel

class OrderSchema(BaseModel):
    productId: int
    qty: int