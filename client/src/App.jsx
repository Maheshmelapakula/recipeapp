import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SavedRecipes from "./pages/SavedRecipes";
import Navbar from "./components/Navbar";
import "./index.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(true);
    }
    setLoading(false); // Ensure loading completes after checking token
  }, []);

  if (loading) return <div className="loading">Loading...</div>; // Prevent rendering before checking token

  return (
    <Router>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="/saved" element={user ? <SavedRecipes /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
