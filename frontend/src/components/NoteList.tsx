import "../styles/note.css";
import type { Note } from "../api/note";
type NotesListProps = {

    notes: Note[];

};

function NotesList({notes} : NotesListProps) {


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
          <div
            key={note.id}
            className="note-card"
          >
            <h3 className="font-bold">{note.title}</h3>

            <p>{note.content}</p>
          </div>
        ))}
      </div>
    )}
  </section>
);
}

export default NotesList;
