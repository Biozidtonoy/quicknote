from passlib.context import CryptContext

from jose import jwt
from datetime import datetime, timedelta, UTC

from jose import JWTError

from app.core.config import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(
    plain_password: str,
    hashed_password: str
    ) -> bool:
    return pwd_context.verify(
        plain_password,
        hashed_password
    )

def create_access_token(data: dict):
    to_encode = data.copy()

    expire = (
        datetime.now(UTC)
        + timedelta(
            minutes=ACCESS_TOKEN_EXPIRE_MINUTES
        )
    )

    to_encode.update(
        {
            "exp": expire
        }
    )

    encoded_jwt = jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return encoded_jwt



def verify_access_token(token: str):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        if email is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid token"
            )

        return email

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials"
        )
    
def get_current_user(

    token: str = Depends(oauth2_scheme),

    db: Session = Depends(get_db)

):

    email = verify_access_token(token)

    user = (

        db.query(User)

        .filter(User.email == email)

        .first()

    )

    if user is None:

        raise HTTPException(

            status_code=401,

            detail="User not found"

        )

    return user