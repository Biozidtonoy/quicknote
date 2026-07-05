from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.database import get_db

from app.models import Note
from app.models import User

from app.schemas.note import NoteCreate
from app.schemas.note import NoteResponse

from app.core.security import get_current_user

router = APIRouter(
    prefix = "/notes",
    tags = ["Notes"]
)

# create note api endpoint
@router.post("",response_model=NoteResponse)
def create_note(
    note_data: NoteCreate,
    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )
):
    # SQLAlchemy Model or SQLAlchemy object or python object
    new_note = Note(

    title=note_data.title,

    content=note_data.content,

    owner_id=current_user.id

    )

    db.add(new_note)

    db.commit()

    db.refresh(new_note)

    return new_note


# get all notes api endpoint 
@router.get("",response_model=list[NoteResponse])
def get_notes(
    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    )

):
    notes = (

        db.query(Note)

        .filter(
            Note.owner_id == current_user.id
        )

        .all()

    )

    return notes