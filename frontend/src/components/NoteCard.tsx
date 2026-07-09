import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { updateNote } from "../api/note";
import type { Note } from "../api/note";
import "../styles/note.css";

type NoteCardProps = {
  note: Note;
  onNoteUpdated: () => void;
};

function NoteCard({ note, onNoteUpdated }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      return;
    }
     if (title === note.title && content === note.content) {
       setIsEditing(false);
       return;
     }
    try {
      await updateNote(note.id, {
        title,
        content,
      });

      setIsEditing(false);

      onNoteUpdated();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="note-card">
      {isEditing ? (
        <>
          <div className="form-group">
            <label htmlFor={`title-${note.id}`}>Title</label>

            <input
              id={`title-${note.id}`}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor={`content-${note.id}`}>Content</label>

            <textarea
              id={`content-${note.id}`}
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </>
      ) : (
        <>
          <h3>{note.title}</h3>

          <p>{note.content}</p>
        </>
      )}

      {isEditing ? (
        <div className="note-actions">
          <button
            className="edit-button"
            // We'll implement this in Part 4
            onClick={handleSave}
          >
            Save
          </button>

          <button
            className="delete-button"
            onClick={() => {
              setTitle(note.title);
              setContent(note.content);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="note-actions">
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <Pencil size={18} />
            Edit
          </button>

          <button className="delete-button">
            <Trash2 size={18} />
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default NoteCard;
