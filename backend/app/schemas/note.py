from pydantic import BaseModel
from pydantic import Field

from datetime import datetime

class NoteCreate(BaseModel):

    title: str = Field(
        min_length=1,
        max_length=100
    )

    content: str = Field(
        min_length=1
    )

from pydantic import BaseModel, Field

class NoteUpdate(BaseModel):

    title: str = Field(
        min_length=1,
        max_length=100
    )

    content: str = Field(
        min_length=1
    )

class NoteResponse(BaseModel):

    id: int

    title: str

    content: str

    created_at: datetime

    model_config = {
    "from_attributes": True
    }


