from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas.user import UserCreate
from app.core.security import hash_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

@router.post("/register")
def register(user_data: UserCreate,db: Session = Depends(get_db)):

    existing_user = (
    db.query(User)
      .filter(User.email == user_data.email)
      .first()
    )

    if existing_user:
        raise HTTPException(
            status_code = 400,
            detail = "Email already registered"
        )
    hashed_password = hash_password(
    user_data.password
    )

    new_user = User(
    name=user_data.name,
    email=user_data.email,
    password_hash=hashed_password
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
    "id": new_user.id,
    "name": new_user.name,
    "email": new_user.email
    }