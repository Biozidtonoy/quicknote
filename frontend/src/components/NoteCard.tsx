import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

import { updateNote, deleteNote } from "../api/note";
import type { Note } from "../api/note";

import "../styles/note.css";

type NoteCardProps = {
  note: Note;
  onNoteUpdated: () => void;
};

function NoteCard({ note, onNoteUpdated }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [title, setTitle] = useState(note.title);

  const [content, setContent] = useState(note.content);

  const [deleteError, setDeleteError] = useState("");

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

  const handleDelete = async () => {
    try {
      setDeleteError("");
      await deleteNote(note.id);

      setShowDeleteConfirm(false);

      onNoteUpdated();
    } catch (error) {
      console.error(error);
      setDeleteError("Failed to delete the note.");
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
          <button className="edit-button" onClick={handleSave}>
            Save
          </button>

          <button
            className="cancel-button"
            onClick={() => {
              setTitle(note.title);
              setContent(note.content);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
        </div>
      ) : showDeleteConfirm ? (
        <>
          <div className="note-actions">
            <span className="delete-warning">Delete this note?</span>

            <button
              className="cancel-button"
              onClick={() => {
                setDeleteError("");
                setShowDeleteConfirm(false);
              }}
            >
              Cancel
            </button>

            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          </div>
          {deleteError && <p className="error-message">{deleteError}</p>}
        </>
      ) : (
        <div className="note-actions">
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            <Pencil size={18} />
            Edit
          </button>

          <button
            className="delete-button"
            onClick={() => {
              setDeleteError("");
              setShowDeleteConfirm(true);
            }}
          >
            <Trash2 size={18} />
            Delete
          </button>
          {deleteError && <p className="error-message">{deleteError}</p>}
        </div>
      )}
    </div>
  );
}

export default NoteCard;
