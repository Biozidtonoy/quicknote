import "../styles/note.css";
import { useState } from "react";
import { createNote } from "../api/note";

type CreateNoteFormProps = {
  onNoteCreated: () => void;
};

function CreateNoteForm({
  onNoteCreated,
}: CreateNoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setSuccess("");
    setError("");

    if (!title.trim() || !content.trim()) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      await createNote({
        title,
        content,
      });

      setSuccess("Note created successfully!");

      setTitle("");
      setContent("");

      onNoteCreated();

    } catch (error) {
      console.error(error);

      setError("Failed to create note.");
    }
  };

  return (
    <div className="create-note">
      <form onSubmit={handleSubmit}>
        <h2>Create Note</h2>

        {success && (
          <p className="success-message">
            {success}
          </p>
        )}

        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        <div className="form-group">
          <label htmlFor="title">
            Title
          </label>

          <input
            id="title"
            type="text"
            placeholder="Enter note title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">
            Content
          </label>

          <textarea
            id="content"
            rows={6}
            placeholder="Write your note..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
          />
        </div>

        <button type="submit">
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNoteForm;