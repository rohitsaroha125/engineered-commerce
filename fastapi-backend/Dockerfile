# syntax=docker/dockerfile:1

FROM python:3.13-slim AS base

# Environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    UV_COMPILE_BYTECODE=1 \
    UV_LINK_MODE=copy

WORKDIR /app

# Install uv
RUN pip install --no-cache-dir uv

# Copy dependency files first (Docker cache)
COPY pyproject.toml ./

# Install dependencies
RUN uv sync --no-dev

# Copy application
COPY . .

# Ensure project itself is installed
RUN uv sync --locked --no-dev

EXPOSE 8000

CMD ["uv", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]