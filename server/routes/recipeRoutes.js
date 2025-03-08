const express = require("express");
const { searchRecipe, saveRecipe, getSavedRecipes } = require("../controllers/recipeController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/search", searchRecipe);
router.post("/save", authMiddleware, saveRecipe);
router.get("/saved", authMiddleware, getSavedRecipes);

module.exports = router;
