from fastapi import APIRouter
from fastapi import Depends
from fastapi import UploadFile
from fastapi import File
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models import User
from app.core.security import get_current_user
from app.database import get_db


import os
import uuid
import shutil

ALLOWED_IMAGE_TYPES = [
    "image/jpeg",
    "image/png",
    "image/webp"
]

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me")
def read_current_user(
    current_user: User = Depends(
        get_current_user
    )
):

    return {
        "id": current_user.id,
        "name": current_user.name,
        "email": current_user.email,
        "profile_image": current_user.profile_image
    }



@router.post("/profile-image")
def upload_profile_image(

    image: UploadFile = File(...),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

    ):

    if image.content_type not in ALLOWED_IMAGE_TYPES:

        raise HTTPException(
        status_code=400,
        detail="Only JPG, PNG and WEBP images are allowed."
    )

    extension = os.path.splitext(image.filename)[1]
    filename = f"{uuid.uuid4()}{extension}"

    file_path = os.path.join("uploads","profile_images",filename)

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(image.file,buffer)
    
    current_user.profile_image = file_path

    db.add(current_user)

    db.commit()

    db.refresh(current_user)

    return {

    "message": "Profile image uploaded successfully.",

    "image_path": file_path

    }