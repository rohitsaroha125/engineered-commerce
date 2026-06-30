import redis
import os

redis_client = redis.Redis(host="localhost", port=6379, db=0)

print("redis check ", redis_client.ping())