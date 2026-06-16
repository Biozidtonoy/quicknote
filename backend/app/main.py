from fastapi import FastAPI
from sqlalchemy import text

from app.database import engine

app = FastAPI()

@app.get("/")
def root():
    return {"message": "QuickNote API"}

@app.get("/health/db")
def db_health():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"database": "connected"}