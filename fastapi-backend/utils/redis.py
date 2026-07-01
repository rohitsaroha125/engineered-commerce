import redis
import os

redis_client = redis.Redis.from_url(os.getenv("REDIS_URL") or "redis://localhost:6379")

print("redis check ", redis_client.ping())