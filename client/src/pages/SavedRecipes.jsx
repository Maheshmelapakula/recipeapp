import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import "./SavedRecipes.css";
import { FaTrash } from "react-icons/fa";

function SavedRecipes() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter((recipe) => recipe.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="saved-recipes-container">
      <h1>💖 Your Saved Recipes</h1>
      {favorites.length > 0 ? (
        <div className="recipe-list">
          {favorites.map((recipe) => (
            <div key={recipe.id} className="recipe-card">
              <Link to={`/recipe/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <h2>{recipe.title}</h2>
              </Link>
              <button className="remove-btn" onClick={() => removeFavorite(recipe.id)}>
                <FaTrash /> Remove
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No saved recipes. Start saving your favorites!</p>
      )}
    </div>
  );
}

export default SavedRecipes;
