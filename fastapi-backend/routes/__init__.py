from fastapi import APIRouter

from .userRoutes import router as user_router
from .categoryRoutes import router as category_router
from .productRoutes import router as product_router

router = APIRouter()

router.include_router(user_router)
router.include_router(category_router)
router.include_router(product_router)