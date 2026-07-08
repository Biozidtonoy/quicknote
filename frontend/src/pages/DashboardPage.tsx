import { useState } from "react";
import "../styles/dashboard.css";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router";
import { removeToken } from "../services/authStorage";

function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    removeToken();

    navigate("/login", { replace: true });
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>QuickNote</h1>
        <button className="desktop-logout"
        onClick={handleLogout}>Logout</button>

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
        <h2>Welcome Back </h2>
        <p>Manage your personal notes from one place.</p>
      </section>

      <section className="actions-section">
        <button>+ Create Note</button>
      </section>

      <section className="notes-section">
        <h3>Recent Notes</h3>

        <div className="empty-notes">
          <p>No notes available.</p>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;