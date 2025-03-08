import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Home.css"; // Import CSS file
import { FaHeart, FaSearch, FaUtensils, FaTimes } from "react-icons/fa"; // Import icons

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecipes();
  }, [category]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const fetchRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&type=${category !== "All" ? category : ""}&apiKey=09dbaf2238ad40c4906f63eebc255c13`;
      const response = await axios.get(apiUrl);
      setRecipes(response.data.results || []);
    } catch (error) {
      console.error("Error fetching recipes", error);
      setError("Failed to load recipes. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const toggleFavorite = (recipe) => {
    let updatedFavorites = [...favorites];
    const index = updatedFavorites.findIndex((fav) => fav.id === recipe.id);

    if (index === -1) {
      updatedFavorites.push(recipe);
    } else {
      updatedFavorites.splice(index, 1);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="home-container">
      <h1><FaUtensils /> Find Your Favorite Recipes</h1>

      {/* 🔍 Search Bar */}
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">
          <FaSearch />
        </button>
        {query && (
          <button className="clear-btn" onClick={() => { setQuery(""); fetchRecipes(); }}>
            <FaTimes />
          </button>
        )}
      </form>

      {/* 📌 Category Filter */}
      <div className="category-filter">
        {["All", "Vegan", "Desserts", "Fast Food", "Healthy", "Drinks"].map((cat) => (
          <button key={cat} className={category === cat ? "active" : ""} onClick={() => setCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* 🔄 Loading & Error Handling */}
      {loading && (
        <div className="skeleton-container">
          {Array(6).fill().map((_, index) => (
            <div key={index} className="skeleton-card"></div>
          ))}
        </div>
      )}

      {error && <p className="error">{error}</p>}

      {/* 🍽️ Recipe Display */}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
              </Link>
              <button
                className={`save-btn ${favorites.some((fav) => fav.id === recipe.id) ? "saved" : ""}`}
                onClick={() => toggleFavorite(recipe)}
              >
                <FaHeart /> {favorites.some((fav) => fav.id === recipe.id) ? "Saved" : "Save Recipe"}
              </button>
            </div>
          ))
        ) : (
          !loading && <p>No recipes found.</p>
        )}
      </div>

      {/* 💖 View Favorite Recipes */}
      {/* <div className="favorites-section">
        <h2>💖 Saved Recipes</h2>
        {favorites.length > 0 ? (
          <div className="recipe-list">
            {favorites.map((recipe) => (
              <div key={recipe.id} className="recipe-card">
                <Link to={`/recipe/${recipe.id}`}>
                  <img src={recipe.image} alt={recipe.title} />
                  <h2>{recipe.title}</h2>
                </Link>
                <button className="remove-btn" onClick={() => toggleFavorite(recipe)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No saved recipes.</p>
        )}
      </div> */}
    </div>
  );
}

export default Home;
