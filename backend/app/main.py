from fastapi import FastAPI
from sqlalchemy import text

from app.database import Base
from app.database import engine

from app.models import User
from app.models import Note

from app.core.security import hash_password
from app.api.auth import router as auth_router

from app.core.security import create_access_token

from app.api.users import router as users_router

from fastapi.staticfiles import StaticFiles

app = FastAPI()
app.include_router(auth_router)
app.include_router(users_router)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

@app.get("/")
def root():
    return {"message": "QuickNote API"}

@app.get("/health/db")
def db_health():
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1"))
        return {"database": "connected"}

@app.get("/hash")
def test_hash():
    return {
        "hash": hash_password("123456")
    }

from app.core.security import create_access_token

@app.get("/token")
def token_test():
    token = create_access_token(
        {
            "sub":"mahfuz@gmail.com"
        }
    )

    return {
        "token": token
    }