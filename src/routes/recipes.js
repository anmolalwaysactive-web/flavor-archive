const express = require('express');
const router = express.Router();
const RecipeController = require('../controllers/recipeController');

const recipeController = new RecipeController();

// Route to get all recipes (with filtering)
router.get('/', (req, res) => recipeController.getAllRecipes(req, res));

// Route to show add recipe form
router.get('/add', (req, res) => recipeController.createRecipe(req, res));

// Route to save a new recipe
router.post('/add', (req, res) => recipeController.saveRecipe(req, res));

// Route to show edit recipe form
router.get('/edit/:id', (req, res) => recipeController.editRecipe(req, res));

// Route to update a recipe
router.post('/edit/:id', (req, res) => recipeController.updateRecipe(req, res));

// Route to delete a recipe
router.post('/delete/:id', (req, res) => recipeController.deleteRecipe(req, res));

// Route to add rating to a recipe
router.post('/:id/rate', (req, res) => recipeController.addRating(req, res));

// Route to get details of a specific recipe
router.get('/:id', (req, res) => recipeController.getRecipeById(req, res));

module.exports = router;