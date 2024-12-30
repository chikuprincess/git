const Recipe = require('../models/recipeModel');

// Create a new recipe
exports.createRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const recipe = new Recipe({ title, ingredients, instructions });
    await recipe.save();
    res.status(201).json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve all recipes
exports.getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json({ success: true, data: recipes });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Retrieve a single recipe by ID
exports.getRecipeById = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a recipe by ID
exports.updateRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions } = req.body;
    const recipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { title, ingredients, instructions },
      { new: true, runValidators: true }
    );
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.status(200).json({ success: true, data: recipe });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a recipe by ID
exports.deleteRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ success: false, message: 'Recipe not found' });
    res.status(200).json({ success: true, message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
