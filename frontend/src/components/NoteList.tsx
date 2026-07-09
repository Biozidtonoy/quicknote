import "../styles/note.css";
import type { Note } from "../api/note";
import NoteCard from "./NoteCard";
type NotesListProps = {
  notes: Note[];
  onNoteUpdated: () => void;
};

function NotesList({ notes, onNoteUpdated,}: NotesListProps) {
  return (
    <section className="notes-list">
      <h2>Recent Notes</h2>

      {notes.length === 0 ? (
        <div className="empty-notes">
          <p>No notes available.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onNoteUpdated={onNoteUpdated} />
          ))}
        </div>
      )}
    </section>
  );
}

export default NotesList;
