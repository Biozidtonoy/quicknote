import { useEffect, useState } from "react";
import "../styles/dashboard.css";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import { removeToken } from "../services/authStorage";
import { getNotes } from "../api/note";
import type { Note } from "../api/note";
import CreateNoteForm from "../components/CreateNoteform";
import NotesList from "../components/NoteList";
import { Search } from "lucide-react";
import { getCurrentUser } from "../api/auth";
import type { CurrentUser } from "../api/auth";

function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const fetchNotes = async () => {
    try {
      const data = await getNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser();

      setCurrentUser(user);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
    fetchCurrentUser();
  }, []);

  const filteredNotes = notes.filter((note) => {
    const search = searchTerm.toLowerCase();

    return (
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search)
    );
  });

  function handleLogout() {
    removeToken();
    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>QuickNote</h1>

        <button className="desktop-logout" onClick={handleLogout}>
          Logout
        </button>

        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {menuOpen && (
          <div className="mobile-menu">
            <button
              className="mobile-logout"
              onClick={() => {
                setMenuOpen(false);
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <section className="welcome-section">
        <h2>
          Welcome Back
          {currentUser ? `, ${currentUser.name}` : ""}
        </h2>

        <p>Manage your personal notes from one place.</p>
      </section>

      <section className="search-section">
        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </section>

      <div className="dashboard-content">
        <CreateNoteForm onNoteCreated={fetchNotes} />

        <NotesList
          notes={filteredNotes}
          onNoteUpdated={fetchNotes}
          searchTerm={searchTerm}
        />
      </div>
    </div>
  );
}

export default DashboardPage;
