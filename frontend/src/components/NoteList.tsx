import "../styles/note.css";
import type { Note } from "../api/note";
import NoteCard from "./NoteCard";
type NotesListProps = {
  notes: Note[];
  onNoteUpdated: () => void;
  searchTerm: string;
};

function NotesList({ notes, onNoteUpdated, searchTerm }: NotesListProps) {
  return (
    <section className="notes-list">
      <h2>Recent Notes</h2>

      {notes.length === 0 ? (
        <div className="empty-notes">
          {searchTerm.trim() ? (
            <>
              <h3>No notes found</h3>

              <p>Try searching with another keyword.</p>
            </>
          ) : (
            <>
              <h3>No notes yet</h3>

              <p>Create your first note to get started.</p>
            </>
          )}
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
