
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./RecipeDetails.css";

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=09dbaf2238ad40c4906f63eebc255c13`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details", error);
        setError("Failed to load recipe details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="recipe-details">
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <h3>Ingredients</h3>
      <ul>
        {recipe.extendedIngredients.map((ing) => (
          <li key={ing.id}>{ing.original}</li>
        ))}
      </ul>
      <h3>Instructions</h3>
      <p dangerouslySetInnerHTML={{ __html: recipe.instructions }}></p>
      <h3>Nutrition</h3>
      <p>{recipe.nutrition?.nutrients.map((n) => `${n.name}: ${n.amount} ${n.unit}`).join(", ")}</p>
    </div>
  );
}

export default RecipeDetails;
