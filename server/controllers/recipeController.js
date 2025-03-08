const axios = require("axios");
const Recipe = require("../models/Recipe");

// Hardcoded API key
const SPOONACULAR_API_KEY = "09dbaf2238ad40c4906f63eebc255c13";

// Search for recipes using Spoonacular API
exports.searchRecipe = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Query parameter is required" });
  }

  try {
    const apiUrl = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=${SPOONACULAR_API_KEY}`;
    
    const response = await axios.get(apiUrl);

    if (!response.data || !response.data.results) {
      return res.status(404).json({ error: "No recipes found" });
    }

    res.json(response.data.results);
  } catch (error) {
    console.error("Error fetching recipes:", error.response?.data || error.message);
    res.status(500).json({ error: "Error fetching recipes" });
  }
};

// Save a recipe to the database
exports.saveRecipe = async (req, res) => {
  const { title, image, ingredients, instructions } = req.body;

  if (!title || !image || !ingredients || !instructions) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const recipe = new Recipe({
      title,
      image,
      ingredients,
      instructions,
      userId: req.user.id, // Ensure `req.user.id` is available
    });

    await recipe.save();
    res.json({ message: "Recipe saved successfully" });
  } catch (error) {
    console.error("Error saving recipe:", error.message);
    res.status(500).json({ error: "Error saving recipe" });
  }
};

// Get saved recipes for the logged-in user
exports.getSavedRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find({ userId: req.user.id });

    if (!recipes.length) {
      return res.status(404).json({ error: "No saved recipes found" });
    }

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching saved recipes:", error.message);
    res.status(500).json({ error: "Error fetching saved recipes" });
  }
};
