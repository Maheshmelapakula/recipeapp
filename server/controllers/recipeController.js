const axios = require("axios");
const Recipe = require("../models/Recipe");
const Saved = require("../models/savedRecipe");

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

exports.saveRecipe = async (req, res) => { 
  try {
    const { id } = req.body;
    if(!id) {
      return res.status(400).json({ error: "Recipe id is required" });
    }
    const recipe = await Saved.create({ id });
    res.json(recipe);
  } catch (error) {
    console.log('====================================');
    console.log(error);
    console.log('====================================');
  }
  
};

