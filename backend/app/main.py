from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text
from fastapi import Request
from fastapi.responses import JSONResponse

from app.database import Base
from app.database import engine

from app.models import User
from app.models import Note

from app.core.security import hash_password
from app.core.security import create_access_token

from app.api.auth import router as auth_router
from app.api.users import router as users_router
from app.api.notes import router as notes_router

from fastapi.staticfiles import StaticFiles
from app.core.config import FRONTEND_URL


app = FastAPI()

@app.exception_handler(Exception)
def global_exception_handler(
    request: Request,
    exc: Exception
):
    return JSONResponse(
        status_code=500,
        content={
            "message": "Something went wrong"
        }
    )

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",
        FRONTEND_URL,

    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]

)

app.include_router(auth_router)
app.include_router(users_router)
app.include_router(notes_router)

app.mount(
    "/uploads",
    StaticFiles(directory="uploads"),
    name="uploads"
)

@app.get("/")
def root():
    return {
        "message": "QuickNote API is running 🚀",
        "docs": "/docs"
    }

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