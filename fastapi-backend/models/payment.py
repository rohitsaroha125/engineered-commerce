from datetime import datetime
from typing import Optional

from sqlmodel import Field, Relationship, SQLModel

from .payment_status import PaymentStatus


class Payment(SQLModel, table=True):
    __tablename__ = "Payment"

    id: Optional[int] = Field(default=None, primary_key=True)

    order_id: int = Field(foreign_key="Order.id")

    amount: int

    stripe_payment_intent_id: str = Field(unique=True)

    stripe_checkout_session_id: Optional[str] = Field(
        default=None,
        unique=True,
    )

    payment_status: PaymentStatus

    created_at: datetime = Field(default_factory=datetime.utcnow)

    updated_at: datetime = Field(default_factory=datetime.utcnow)

    order: Optional["Order"] = Relationship(back_populates="payments")