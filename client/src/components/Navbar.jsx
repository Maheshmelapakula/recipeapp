import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css"; // Import styles

function Navbar({ user, setUser }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="logo">🍽️ Recipe App</Link>

        {/* Mobile Menu Toggle */}
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>

        {/* Navigation Links (Home Removed) */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {user ? (
            <>
              <Link to="/saved" onClick={() => setMenuOpen(false)}>Saved Recipes</Link>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
